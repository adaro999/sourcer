import React, { FormEvent, useEffect, useRef, useMemo, useState } from 'react';
import $ from 'jquery';
import { Button as JTButton, ButtonIcon, CheckboxGroup, ModalContainer, Spinner, Tabs, TokenInputField } from '@jobtarget/ui-library';
import { Button, Col, Form, Modal, ModalHeader, Row } from 'reactstrap';
import { AdvancedTools } from '../../organisms/AdvancedTools';
import { CandidateContact } from '../../organisms/CandidateContact';
import { CandidateLockedPreview } from '../../organisms/CandidateLockedPreview';
import { CandidateOverview } from '../../molecules/CandidateOverview';
import { CandidateUnlockedPreview } from '../../organisms/CandidateUnlockedPreview';
import { ContactInformation } from '../../organisms/ContactInformation';
import { EnrichedRibbon } from '../../molecules/EnrichedRibbon';
import { FilterSearch } from '../../molecules/FilterSearch';
import { FormWrapper } from '../../molecules/FormWrapper';
import { InitialState } from '../../molecules/InitialState';
import { MoreMenuListItem } from '../../atoms/MoreMenuListItem';
import { NoCredits } from '../../atoms/NoCredits';
import { NoResults } from '../../molecules/NoResults';
import { OffCanvas } from '../../atoms/OffCanvas';
import { PDFViewer } from '../../atoms/PDFViewer';
import { ProfileCard } from '../../organisms/ProfileCard';
import { ProfileFooterDetails } from '../../molecules/ProfileFooterDetails';
import { ProfileNote } from '../../atoms/ProfileNote';
import { ProfileNoteEdit } from '../../molecules/ProfileNoteEdit';
import { SearchForm } from '../../organisms/SearchForm';
import { SentOutreachEmail } from '../../molecules/SentOutreachEmail';
import { SentOutreachMessage } from '../../molecules/SentOutreachMessage';
import { SentOutreachWrapper } from '../../molecules/SentOutreachWrapper';
import { useProfileCardController } from '../../../hooks/useProfileCardController';
import { buildFilterItems, getSearchItems } from './util';
import { getFilteredOptions } from '../../molecules/FilterSearch/util';
import { buildContactInfoArray, getFooterMenuItems, isResumeBase64 } from '../../../utils';
import { getConnectedCredits, getProfiles } from '../../../api/';
import { pushAnalyticsEvent } from '../../../utils/analytics';
import { ICard } from '../../../pages/api/profiles/getProfiles/types';
import { IGetProfiles } from '../../../api/types';
import { IFilterCategory } from '../../molecules/FilterSearch/types';
import { IConnectionType, IGetConnectedCredits } from '../../../pages/api/credits/types';
import { IPageProps } from '../../../types/types';
import styles from './styles.module.scss';

const SearchTemplate = ({ company, currentDivision, firstName, jtToken, lastName, recruiterId }: IPageProps) => {
  const [searchType, setSearchType] = useState<IConnectionType>('all');
  const [resultsAllLength, setResultsAllLength] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState('');
  const [connectedCredits, setConnectedCredits] = useState<IGetConnectedCredits[]>([]);
  const [fetchController, setFetchController] = useState(new AbortController());
  const {
    cardState,
    handleCandidateContact,
    handleDeleteNote,
    handleProfileFooterMenuClick,
    handleProfileFooterSaveClick,
    handleSaveNotes,
    onFilterBySearch,
    onSourceChange,
    onSubmit,
    onSuccessfulSubmit,
    setCardState,
    updateResults,
  } = useProfileCardController({
    company,
    recruiterId,
    jtToken,
  });
  const jobAndSkillTokens = useMemo(() => [...cardState.query.jobTitleTokens, ...cardState.query.skillTokens], [cardState.query.jobTitleTokens, cardState.query.skillTokens]);
  const contactDiv = useRef<HTMLDivElement>(null);
  const hasCredits = useMemo(() => connectedCredits.find(elm => elm.type === searchType && elm.credits) || searchType === 'ind', [connectedCredits, searchType]);

  const recruiter = {
    company_id: company?.companyId.toString(),
    division_id: currentDivision?.id.toString(),
    recruiter_id: recruiterId?.toString() || '',
    firstName: firstName || '',
    lastName: lastName || '',
  };

  // returns the profiles for the given search params
  const fetchProfileData = async (params?: Partial<IGetProfiles>) => {
    const controller = new AbortController();
    setFetchController(controller);

    // close advanced search modal if its currently open
    $('#modalId').modal('hide');

    try {
      if (cardState.query?.what) {
        const data = await getProfiles({
          companies_search: cardState.query.searchLimit.Company ? 'True' : 'False',
          jobtitle_must_have: cardState.query.jobTitleTokens.join(';'),
          job_titles_search: cardState.query.searchLimit['Job Title'] ? 'True' : 'False',
          lat: cardState.query?.where?.lat || '',
          lon: cardState.query?.where?.lon || '',
          page_no: cardState.query.page.toString(),
          rli_new_scroll: cardState.query.loadMore ? cardState.query.rliNewScroll : '',
          scroll_id: cardState.query.loadMore ? cardState.query.scrollId || '' : '',
          scroll_jbt_id: cardState.query.loadMore ? cardState.query.scrollJbtId || '' : '',
          signal: controller.signal,
          skills_must_have: cardState.query.skillTokens.join(';'),
          skills_search: cardState.query.searchLimit.Skills ? 'True' : 'False',
          sources: params?.sources || searchType,
          token: jtToken || '',
          what: cardState.query?.what,
          where: cardState.query?.where?.loc || '',
          ...params,
        });

        if (searchType == 'all') {
          setResultsAllLength(data?.card?.length || 0);
        }

        setTotalPages(data ? data.total_hits / 10 : 0);

        return data;
      }
    } catch {
      setResultsAllLength(0);
      return null;
    }
  };

  const handleNoResults = () => {
    pushAnalyticsEvent('Search with No Results', { searchTerm: cardState.query?.what });
  };

  // search form handler when the main search form button is clicked
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const newPage = cardState.query.page + 1;
    onSubmit({ newPage });

    if (cardState.query?.what) {
      const data = await fetchProfileData({ page_no: cardState.query.loadMore ? newPage.toString() : '1' });

      if (data) {
        if (data.card.length > 0) {
          onSuccessfulSubmit(data);
        } else {
          handleNoResults();
        }
      }
    }
  };

  // fetch new profiles when a source type is clicked
  const handleSourceChange = async (type: IConnectionType) => {
    fetchController.abort();
    onSourceChange();
    setSearchType(type);
    const data = await fetchProfileData({ page_no: '1', sources: type });

    if (data) {
      if (data?.card.length > 0) {
        updateResults(data);
      } else {
        handleNoResults();
      }
    }
  };

  const RenderResume = ({ resume, profile_id }: { resume: string; profile_id: string }) => {
    let props = {};

    if (isResumeBase64(resume)) {
      return <PDFViewer height="700">{resume}</PDFViewer>;
    }

    if (searchType === 'ind') {
      props = { src: resume, style: { border: 0 } };
    }

    if (searchType == 'cab' || profile_id.startsWith('cab')) {
      props = { className: 'card', srcDoc: resume, style: { backgroundColor: '#f8f9fa', marginTop: '1.75rem', padding: '1rem' } };
    }

    // resume is HTML
    return <iframe height={800} width="100%" {...props} />;
  };

  const handleProfileCardClick = (profile: ICard) => {
    pushAnalyticsEvent('Candidate Card');

    if (hasCredits) {
      setCardState({ type: 'candidate', payload: { active: profile } });
      pushAnalyticsEvent.CardClick(profile.id);
    }
  };

  // fetches new profile data when a 'filter search by' side effect happens
  useEffect(() => {
    // if we have 'filter search by' options...
    if (Object.keys(cardState.query.selectedOptions).length > 0) {
      setCardState({ type: 'query', payload: { isSearching: true } });

      // reduce the selectedObjects into a single object that we can pass in
      const reducedSelectedOptions: Partial<Record<IFilterCategory, string>> = Object.entries(getFilteredOptions(cardState.query.selectedOptions)).reduce(
        (acc, curr) => ({ ...acc, [curr[0]]: Object.keys(curr[1]).toString().toLowerCase() }),
        {},
      );

      fetchProfileData({ page_no: '1', ...reducedSelectedOptions }).then(data => {
        if (data?.card && data.card.length > 0) {
          updateResults(data);
          setCardState({ type: 'query', payload: { filterItems: buildFilterItems(data.facets, reducedSelectedOptions) } });
        } else {
          setCardState({ type: 'query', payload: { hasSearched: true, isSearching: false } });
          handleNoResults();
        }
      });
    }

    // only run this effect if/when 'filter search by' items get changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardState.query.selectedOptions]);

  useEffect(() => {
    getConnectedCredits({ token: jtToken || '' }).then(data => {
      if (data) {
        setConnectedCredits(data);
      }
    });
  }, [jtToken]);

  // Since we removed the isSearching: false in the catch block of fetchProfileData
  // we need to set this after 30 seconds if a search returns with an error
  useEffect(() => {
    const timer = setTimeout(() => {
      setCardState({ type: 'query', payload: { isSearching: false } });
    }, 30000);

    if (cardState.query.isSearching) {
      timer;
    }

    return () => clearTimeout(timer);
  }, [cardState.query.isSearching, setCardState]);

  return (
    <>
      <Form onSubmit={handleSubmit} id="search-form" data-testid="SearchForm" className="pt-0">
        <FormWrapper>
          <SearchForm
            formData={{ what: cardState.query.what, location: cardState.query.where }}
            setFormData={obj => setCardState({ type: 'query', payload: { form: 'Search', ...obj } })}
          >
            <Col sm={12} className="d-flex flex-row-reverse align-items-center justify-content-between pt-3 px-0">
              <AdvancedTools
                jobTitleSkills={
                  <TokenInputField
                    id="job-tokens"
                    label="Job Title"
                    message="Enter keywords and press Enter"
                    name="jobTokens"
                    onUpdate={arr => setCardState({ type: 'query', payload: { jobTitleTokens: arr } })}
                    placeholder="Enter required job title here"
                    value={cardState.query.jobTitleTokens}
                  />
                }
                limitSearch={
                  <CheckboxGroup
                    checkedKey="value"
                    className={styles.group}
                    handleChange={obj => setCardState({ type: 'query', payload: { searchLimit: obj } })}
                    inline
                    options={[
                      { id: 'check-title', label: 'Job Title', name: 'search-limit', value: 'Job Title' },
                      { id: 'check-company', label: 'Company', name: 'search-limit', value: 'Company' },
                      { id: 'check-skills', label: 'Skills', name: 'search-limit', value: 'Skills' },
                    ]}
                  />
                }
                rulesButton={
                  <>
                    {jobAndSkillTokens.length > 0 ? (
                      <div className="text-success">
                        <span className="pr-2">|</span>
                        <span className="user-select-none">
                          {jobAndSkillTokens.length} Rule
                          {jobAndSkillTokens.length > 1 ? 's' : ''} Applied
                        </span>
                        <ButtonIcon onClick={() => setCardState({ type: 'query', payload: { jobTitleTokens: [], skillTokens: [] } })}>
                          <i className="fas fa-times-circle text-success"></i>
                        </ButtonIcon>
                      </div>
                    ) : null}
                  </>
                }
                submitButton={
                  <Button color="primary" disabled={!cardState.query?.what} type="submit">
                    Search
                  </Button>
                }
                tokenSkills={
                  <TokenInputField
                    id="skill-tokens"
                    label="Skills"
                    message="Enter keywords and press Enter"
                    name="skillTokens"
                    onUpdate={arr => setCardState({ type: 'query', payload: { skillTokens: arr } })}
                    placeholder="Enter required skills here"
                    value={cardState.query.skillTokens}
                  />
                }
              >
                <SearchForm
                  formData={{ what: cardState.query.what, location: cardState.query.where }}
                  setFormData={obj => setCardState({ type: 'query', payload: { form: 'Advanced', ...obj } })}
                />
              </AdvancedTools>
              {!cardState.query.isSearching && cardState.query.hasSearched && cardState.query.filterItems && (
                <FilterSearch onChange={onFilterBySearch} items={cardState.query.filterItems} />
              )}
            </Col>
          </SearchForm>
        </FormWrapper>
      </Form>
      {cardState.query.hasSearched && (
        <Tabs<IConnectionType>
          className="custom-list"
          handleChange={({ id }) => {
            setSearchType(id);
            handleSourceChange(id);
          }}
          items={getSearchItems(connectedCredits, searchType)}
        />
      )}
      {cardState.query.results.length > 0 || resultsAllLength > 0 ? (
        <>
          <hr className="mt-0 mb-5" />
          <Row>
            <Col sm={4}>
              <Modal isOpen={deleteModalOpen}>
                <ModalContainer>
                  <ModalHeader className="px-4">Delete Message</ModalHeader>
                  <div className="modal-body px-4">Are you sure you want to delete this message?</div>
                  <ModalContainer.Footer className="px-4">
                    <div className="px-2">
                      <JTButton
                        variant="link"
                        onClick={() => {
                          setDeleteModalOpen(false);
                          setNoteToDelete('');
                        }}
                      >
                        Cancel
                      </JTButton>
                    </div>
                    <JTButton
                      variant="danger"
                      onClick={() => {
                        handleDeleteNote({ id: noteToDelete });
                        setDeleteModalOpen(false);
                      }}
                    >
                      Delete
                    </JTButton>
                  </ModalContainer.Footer>
                </ModalContainer>
              </Modal>
              {!cardState.query.isSearching && <div className="pl-2 pb-2">{cardState.query.totalResults} Results</div>}
              {cardState.query.results.slice(0, cardState.query.page * 10).map((elm, index) => {
                const items = getFooterMenuItems(elm);
                const showEditScreen = !elm.hidden && cardState.candidate.editingState[elm.id]?.isEditing;
                const showProfileNote = !elm.hidden && elm.notes && !showEditScreen;
                const isUnlocked = Boolean(!elm.hidden && (elm?.connection || elm?.outreach));

                return (
                  <ProfileCard handleClick={profile => handleProfileCardClick(profile)} isActive={cardState.candidate.active?.id === elm.id} key={index} {...elm}>
                    <div className="d-flex justify-content-between align-items-center">
                      <ProfileFooterDetails card={elm} onSaveClick={() => handleProfileFooterSaveClick(elm)} {...{ isUnlocked }}>
                        {items.map((innerElm, index) => (
                          <button
                            className="dropdown-item px-3 py-2"
                            key={index}
                            onClick={() => {
                              if (innerElm.title.toLowerCase() === 'delete note') {
                                setDeleteModalOpen(true);
                                setNoteToDelete(elm.id);
                              }

                              handleProfileFooterMenuClick({ ...elm, buttonName: innerElm.title });
                            }}
                          >
                            <MoreMenuListItem {...innerElm} />
                          </button>
                        ))}
                      </ProfileFooterDetails>
                    </div>
                    {showProfileNote && <ProfileNote>{elm.notes}</ProfileNote>}
                    {showEditScreen && (
                      <ProfileNoteEdit
                        defaultValue={cardState.candidate.editingState[elm.id]?.notes || elm.notes}
                        handleAdd={() => handleSaveNotes(elm)}
                        handleCancel={() => setCardState({ type: 'card-editing', payload: { [elm.id]: { isEditing: false } } })}
                        handleChange={str => setCardState({ type: 'card-editing', payload: { [elm.id]: { notes: str } } })}
                        name={elm.name.first_name}
                      />
                    )}
                  </ProfileCard>
                );
              })}
              {cardState.query.isSearching && <Spinner variant="xlarge" />}
            </Col>
            <Col sm={8}>
              <div className="sticky-top top-30" style={{ zIndex: '9' }}>
                {!hasCredits && (
                  <NoCredits>
                    {searchType === 'dic' && 'You are out of Dice credits. No results found.'}
                    {searchType === 'cab' ? 'You are out of CAB credits. No results found.' : 'You are out of Sourcer credits. Please contact your JobTarget Relationship Manager'}
                  </NoCredits>
                )}
                {cardState.candidate.isLoading ? (
                  <Spinner variant="xlarge" />
                ) : (
                  // active profile has been clicked on
                  cardState.candidate.active?.id && (
                    <>
                      {
                        // active profile has been contacted
                        cardState.candidate.active?.connection?.profile_id ? (
                          <>
                            <CandidateUnlockedPreview>
                              <p className="text-gray-500">{cardState.candidate.message?.connection_time}</p>
                              <Button
                                color="primary"
                                onClick={() => setCardState({ type: 'panel', payload: { content: 'unlocked', isOpen: !cardState.panel.isOpen, variant: 'small' } })}
                                outline
                                type="button"
                              >
                                View Sent Message
                              </Button>
                            </CandidateUnlockedPreview>
                            <ContactInformation items={buildContactInfoArray(cardState.candidate.active)}>
                              {cardState.candidate.active.enriched_icon && <EnrichedRibbon position="right-middle" />}
                            </ContactInformation>
                          </>
                        ) : searchType === 'cab' || searchType === 'dic' ? null : (
                          <CandidateLockedPreview>
                            <Button
                              color="primary"
                              onClick={() => {
                                handleCandidateContact(cardState.candidate.active.id);
                              }}
                              type="button"
                            >
                              Contact Candidate
                            </Button>
                          </CandidateLockedPreview>
                        )
                      }
                      {cardState.candidate.active.source?.resume_content && hasCredits ? (
                        <RenderResume resume={cardState.candidate.active.source?.resume_content} profile_id={cardState.candidate.active.id || ''} {...{ contactDiv, searchType }} />
                      ) : (
                        !cardState.query.isSearching && hasCredits && <CandidateOverview {...cardState.candidate.active} />
                      )}
                    </>
                  )
                )}
              </div>
            </Col>
            <OffCanvas isActive={cardState.panel.isOpen} toggleActive={state => setCardState({ type: 'panel', payload: { isOpen: state } })} variant={cardState.panel.variant}>
              {cardState.panel.content === 'locked' ? (
                <CandidateContact
                  card={cardState.candidate.active}
                  name={cardState.candidate.active.name?.first_name}
                  onRouteChange={() => setCardState({ type: 'panel', payload: { isOpen: false } })}
                  profile_id={cardState.candidate.active.id}
                  resume={cardState.candidate.active.source?.resume_content}
                  {...{ jtToken, recruiter }}
                ></CandidateContact>
              ) : (
                <SentOutreachWrapper date={cardState.candidate.message?.connection_time}>
                  <SentOutreachEmail
                    name={cardState.candidate.active.name?.first_name}
                    jobDetails={{
                      job_title: cardState.candidate.message?.job_title,
                      jobDescription_text: cardState.candidate.message?.job_description,
                      jobDescription_location: cardState.candidate.message?.location,
                      jobDescription_company: cardState.candidate.message?.company,
                    }}
                    jobLocation={cardState.candidate.message?.location}
                    jobTitle={cardState.candidate.message?.job_title}
                  >
                    <SentOutreachMessage message={cardState.candidate.message?.message} {...{ recruiter }} />
                  </SentOutreachEmail>
                </SentOutreachWrapper>
              )}
            </OffCanvas>
          </Row>
        </>
      ) : cardState.query.isSearching ? (
        <Spinner variant="xlarge" />
      ) : cardState.query.hasSearched ? (
        <NoResults />
      ) : (
        <InitialState />
      )}
      <Row>
        <Col xs={12}>
          {(cardState.query.results.length > 10 || parseInt(cardState.query.totalResults.replace(/\,/g, '')) > 10) && cardState.query.page < totalPages && (
            <Button block={true} color="primary" form="search-form" onClick={() => setCardState({ type: 'query', payload: { loadMore: true } })} outline type="submit">
              Load More
            </Button>
          )}
        </Col>
      </Row>
    </>
  );
};

export { SearchTemplate };
