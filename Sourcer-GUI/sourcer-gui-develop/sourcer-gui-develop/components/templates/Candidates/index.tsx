import React, { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button, Col, Modal, ModalHeader, Row } from 'reactstrap';
import Router from 'next/router';
import { Button as JTButton, ModalContainer, Spinner, Tabs } from '@jobtarget/ui-library';
import { CandidateContact } from '../../organisms/CandidateContact';
import { CandidateLockedPreview } from '../../organisms/CandidateLockedPreview';
import { CandidateOverview } from '../../molecules/CandidateOverview';
import { CandidatesForm } from '../../organisms/CandidatesForm';
import { CandidateUnlockedPreview } from '../../organisms/CandidateUnlockedPreview';
import { ContactInformation } from '../../organisms/ContactInformation';
import { EnrichedRibbon } from '../../molecules/EnrichedRibbon';
import { buildContactInfoArray } from '../../../utils';
import { getAllProfiles, getSavedProfiles, getUnlockedProfiles } from '../../../api';
import { InitialState } from '../../molecules/InitialState';
import { MoreMenuListItem } from '../../atoms/MoreMenuListItem';
import { NoResults } from '../../molecules/NoResults';
import { OffCanvas } from '../../atoms/OffCanvas';
import { ProfileCard } from '../../organisms/ProfileCard';
import { ProfileFooterDetails } from '../../molecules/ProfileFooterDetails';
import { ProfileNote } from '../../atoms/ProfileNote';
import { ProfileNoteEdit } from '../../molecules/ProfileNoteEdit';
import { SentOutreachEmail } from '../../molecules/SentOutreachEmail';
import { SentOutreachMessage } from '../../molecules/SentOutreachMessage';
import { SentOutreachWrapper } from '../../molecules/SentOutreachWrapper';
import { getFooterMenuItems, isResumeBase64 } from '../../../utils';
import { useProfileCardController } from '../../../hooks/useProfileCardController';
import { ICard } from '../../../pages/api/profiles/getProfiles/types';
import { IGetRIdProfiles } from '../../../api/types';
import { IPageProps } from '../../../types/types';
import { IProfileTypes } from '../../../utils/interfaces/Profiles/IProfileBase';
import { pushAnalyticsEvent } from '../../../utils/analytics';
import { PDFViewer } from '../../atoms/PDFViewer';

const CandidatesTemplate = ({ company, currentDivision, firstName, jtToken, lastName, recruiterId }: IPageProps) => {
  const [filterType, setFilterType] = useState<IProfileTypes>('all');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState('');
  const contactDiv = useRef<HTMLDivElement>(null);
  const {
    cardState,
    handleCandidateContact,
    handleDeleteNote,
    handleProfileFooterMenuClick,
    handleProfileFooterSaveClick,
    handleSaveNotes,
    onSubmit,
    onSuccessfulSubmit,
    setCardState,
    updateResults,
  } = useProfileCardController({
    company,
    recruiterId,
    jtToken,
  });
  const hasOutreached = useMemo(
    () => cardState.candidate.active?.connection?.profile_id && !(cardState.candidate?.active?.id?.startsWith('dic') || cardState.candidate?.active?.id?.startsWith('cab')),
    [cardState.candidate.active.connection?.profile_id, cardState.candidate.active.id],
  );
  const shouldHide = useMemo(() => cardState.candidate?.active?.id?.startsWith('dic') || cardState.candidate?.active?.id?.startsWith('cab'), [cardState.candidate.active.id]);

  const recruiter = {
    company_id: company?.companyId.toString(),
    division_id: currentDivision?.id.toString(),
    recruiter_id: recruiterId?.toString() || '',
    firstName: firstName || '',
    lastName: lastName || '',
  };

  const fetchProfiles = useCallback(
    async (obj: IGetRIdProfiles) => {
      const payload = { ...obj, token: jtToken || '' };
      try {
        switch (filterType) {
          case 'saved':
            return await getSavedProfiles(payload);
          case 'unlocked':
            return await getUnlockedProfiles(payload);
          default:
            return await getAllProfiles(payload);
        }
      } catch (error) {
        console.warn(error);
      }
    },
    [filterType, jtToken],
  );

  // candidate search and loadmore
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const newPage = cardState.query.page + 1;
    onSubmit({ newPage });

    if (recruiterId) {
      const data = await fetchProfiles({
        page_no_saved_profile: cardState.query.loadMore ? newPage : 1,
        ...((cardState.query.loadMore || cardState.query?.what != '') && { q: cardState.query.what }),
      });

      if (data?.card && data.card.length > 0) {
        onSuccessfulSubmit(data);
      }
    }
  };

  const handleProfileCardClick = (profile: ICard) => {
    pushAnalyticsEvent('Candidate Card');
    setCardState({ type: 'candidate', payload: { active: profile } });
  };

  const RenderResume = ({ resume }: { resume: string }) => {
    let props = {};

    if (isResumeBase64(resume)) {
      return <PDFViewer height="700">{resume}</PDFViewer>;
    }

    if (cardState.candidate?.active?.id?.startsWith('ind')) {
      props = { src: resume, style: { border: 0 } };
    }

    if (cardState.candidate?.active?.id?.startsWith('cab')) {
      props = { className: 'card', srcDoc: resume, style: { backgroundColor: '#f8f9fa', marginTop: '1.75rem', padding: '1rem' } };
    }

    // resume is HTML
    return <iframe height={800} width="100%" {...props} />;
  };

  useEffect(() => {
    const newPage = cardState.query.page + 1;

    // for google analytics
    Router.push(
      {
        pathname: '/candidates',
        query: { t: filterType },
      },
      '/candidates',
    );

    onSubmit({ newPage });
    // clear search term when switching between filterType
    setCardState({ type: 'query', payload: { isSearching: true, what: '' } });

    // TODO: find a better way to clear form in CandidatesForm
    if (document.getElementById('search-candidates-form') && document.querySelector('.select__control .select__single-value')) {
      (document.getElementById('search-candidates-form') as HTMLFormElement).reset();
      (document.querySelector('.select__control .select__single-value') as HTMLFormElement).innerHTML = '';
    }

    // fetch profiles
    fetchProfiles({ page_no_saved_profile: 1 }).then(data => {
      if (data?.card) {
        updateResults(data);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterType]);

  return (
    <>
      <CandidatesForm
        formData={{ what: cardState.query.what }}
        setFormData={obj => setCardState({ type: 'query', payload: { form: 'Candidate', ...obj } })}
        {...{ handleSubmit }}
      />
      {cardState.query.results && (
        <Tabs<IProfileTypes>
          className="custom-list"
          handleChange={({ id }) => setFilterType(id)}
          items={[
            { children: 'All Candidates', id: 'all' },
            { children: 'Unlocked Candidates', id: 'unlocked' },
            { children: 'Saved Candidates', id: 'saved' },
          ]}
        />
      )}
      <hr className="mt-0 mb-5" />

      {cardState.query.results?.length > 0 ? (
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
            {cardState.query.results.slice(0, cardState.query.page * 10).map((elm, index) => {
              const items = getFooterMenuItems(elm);
              const showEditScreen = !elm.hidden && cardState.candidate.editingState[elm.id]?.isEditing;
              const showProfileNote = !elm.hidden && elm.notes && !showEditScreen;
              const isUnlocked = Boolean(!elm.hidden && elm?.outreach);

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
          </Col>
          <Col sm={8}>
            <div className="sticky-top top-30" style={{ zIndex: '9' }}>
              {cardState.query.isLoading ? (
                <Spinner variant="xlarge" />
              ) : (
                cardState.candidate.active?.id && (
                  <>
                    <div ref={contactDiv}>
                      {hasOutreached ? (
                        <>
                          <CandidateUnlockedPreview>
                            <p className="text-gray-500">{cardState.candidate.message?.connection_time}</p>
                            <Button
                              color="primary"
                              data-toggle="offcanvas"
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
                      ) : shouldHide ? null : (
                        <CandidateLockedPreview>
                          <Button color="primary" onClick={() => handleCandidateContact(cardState.candidate.active.id)} type="button">
                            Contact Candidate
                          </Button>
                        </CandidateLockedPreview>
                      )}
                    </div>
                    {cardState.candidate.active.source?.resume_content ? (
                      <RenderResume resume={cardState.candidate.active.source?.resume_content} />
                    ) : (
                      <CandidateOverview {...cardState.candidate.active} />
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
                {...{ jtToken, recruiter, setCardState }}
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
      ) : cardState.query.isSearching ? (
        <Spinner variant="xlarge" />
      ) : cardState.query.hasSearched ? (
        <NoResults />
      ) : (
        <InitialState />
      )}
      <Row>
        <Col xs={12}>
          {cardState.query.results.length > 10 && (
            <Button block={true} color="primary" form="search-candidates-form" onClick={() => setCardState({ type: 'query', payload: { loadMore: true } })} outline type="submit">
              Load More
            </Button>
          )}
        </Col>
      </Row>
    </>
  );
};

export { CandidatesTemplate };
