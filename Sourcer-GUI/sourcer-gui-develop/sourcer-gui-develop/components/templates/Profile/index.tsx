import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Col } from 'reactstrap';
import { Spinner } from '@jobtarget/ui-library';
import { CandidateContact } from '../../organisms/CandidateContact';
import { CandidateLockedPreview } from '../../organisms/CandidateLockedPreview';
import { CandidateOverview } from '../../molecules/CandidateOverview';
import { CandidateUnlockedPreview } from '../../organisms/CandidateUnlockedPreview';
import { ContactInformation } from '../../organisms/ContactInformation';
import { EnrichedRibbon } from '../../molecules/EnrichedRibbon';
import { NoCredits } from '../../atoms/NoCredits';
import { OffCanvas } from '../../atoms/OffCanvas';
import { PDFViewer } from '../../atoms/PDFViewer';
import { SentOutreachEmail } from '../../molecules/SentOutreachEmail';
import { SentOutreachMessage } from '../../molecules/SentOutreachMessage';
import { SentOutreachWrapper } from '../../molecules/SentOutreachWrapper';
import { useProfileCardController } from '../../../hooks/useProfileCardController';
import { buildContactInfoArray, decryptString, isEncrypted } from '../../../utils';
import { getCredits, getProfile, getUnlockedProfile } from '../../../api';
import { IPageProps } from '../../../types/types';

const ProfileTemplate = ({ company, currentDivision, firstName, jtToken, lastName, recruiterId }: IPageProps) => {
  const [creditsAvailable, setCreditsAvailable] = useState(0);
  const { cardState, setCardState } = useProfileCardController({
    company,
    recruiterId,
    jtToken,
  });

  const router = useRouter();
  // get id from url; id's are url encoded
  const query_id = decodeURIComponent(decodeURIComponent(router.query.id?.toString() || ''));
  // check if id is encrypted; decrypt if needed
  const profile_id = isEncrypted(query_id) ? decryptString(query_id) : query_id;

  const recruiter = {
    company_id: company?.companyId.toString(),
    division_id: currentDivision?.id.toString(),
    recruiter_id: recruiterId?.toString() || '',
    firstName: firstName || '',
    lastName: lastName || '',
  };

  const fetchProfile = async () => {
    // get card object
    const card = await getUnlockedProfile({
      profile_id,
      token: jtToken || '',
    });

    // get other info for candidate overview
    await getProfile({
      profile_id,
      token: jtToken || '',
    }).then(data => {
      // use cardState to render profile components
      setCardState({
        type: 'candidate',
        payload: {
          active: {
            ...data,
            ...card,
            ...card?.card,
          },
        },
      });
    });
    setCardState({ type: 'query', payload: { isSearching: false } });
  };

  useEffect(() => {
    getCredits({ token: jtToken || '' }).then(data => setCreditsAvailable(Number(data?.rli?.premium_credits_available || 0)));
  }, [jtToken]);

  useEffect(() => {
    // fetch the profile data on initial page load
    setCardState({ type: 'query', payload: { isSearching: true } });
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {cardState.query.isSearching ? (
        <Spinner variant="xlarge" />
      ) : (
        <>
          <div id="profile-container" data-profile-id={profile_id}>
            <div className={`d-flex px-4 py-4'}`}>
              <Col className="pl-0" sm={6}>
                {cardState.candidate.active.source?.resume_content || cardState.candidate.active.resume ? (
                  <>
                    <h4 className="mb-0 pt-2 pb-4 text-primary">Candidate Resume</h4>
                    <PDFViewer height="700">{cardState.candidate.active.source?.resume_content || cardState.candidate.active.resume}</PDFViewer>
                  </>
                ) : (
                  <>
                    <CandidateOverview {...cardState.candidate.active} />
                  </>
                )}
              </Col>

              {typeof router.query.contact !== 'undefined' &&
              !(cardState.candidate.message?.connection_time || cardState.candidate?.active.raw_response?.unlock_status == 'unlocked') ? (
                <>
                  {creditsAvailable ? (
                    <Col className="mt-0 pt-0 pr-0" sm={6}>
                      <CandidateContact
                        card={cardState.candidate.active}
                        name={cardState.candidate.active.name?.first_name}
                        onRouteChange={() => setCardState({ type: 'panel', payload: { isOpen: false } })}
                        profile_id={cardState.candidate.active.id}
                        resume={cardState.candidate.active.source?.resume_content}
                        {...{ jtToken, recruiter, setCardState }}
                      ></CandidateContact>
                    </Col>
                  ) : (
                    <Col className="mt-4 pt-4 pr-0" sm={6}>
                      <NoCredits>No Credits Available</NoCredits>
                    </Col>
                  )}
                </>
              ) : (
                <Col className="mt-4 pt-4 pr-0" sm={6}>
                  <div className="pt-2">
                    {cardState.candidate.message?.connection_time || cardState.candidate?.active.raw_response?.unlock_status == 'unlocked' ? (
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
                        <ContactInformation items={buildContactInfoArray(cardState.candidate.active)} isOpen={true}>
                          {cardState.candidate.active.enriched_icon && <EnrichedRibbon position="right-middle" />}
                        </ContactInformation>
                      </>
                    ) : creditsAvailable ? (
                      <>
                        <CandidateLockedPreview>
                          <Button
                            color="primary"
                            data-toggle="offcanvas"
                            onClick={() => setCardState({ type: 'panel', payload: { content: 'locked', isOpen: !cardState.panel.isOpen, variant: 'small' } })}
                            type="button"
                          >
                            Contact Candidate
                          </Button>
                        </CandidateLockedPreview>
                        {(cardState.candidate.active.source?.resume_content || cardState.candidate.active.resume) && <CandidateOverview {...cardState.candidate.active} />}
                      </>
                    ) : (
                      <NoCredits>No Credits Available</NoCredits>
                    )}
                  </div>
                  <OffCanvas
                    isActive={cardState.panel.isOpen}
                    toggleActive={state => setCardState({ type: 'panel', payload: { isOpen: state } })}
                    variant={cardState.panel.variant}
                  >
                    <div className="m-4">
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
                            <SentOutreachMessage
                              message={cardState.candidate.message?.message}
                              recruiter={{
                                company_id: company?.companyId.toString(),
                                division_id: currentDivision?.id.toString(),
                                recruiter_id: recruiterId?.toString() || '',
                                firstName: firstName || '',
                                lastName: lastName || '',
                              }}
                            />
                          </SentOutreachEmail>
                        </SentOutreachWrapper>
                      )}
                    </div>
                  </OffCanvas>
                </Col>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export { ProfileTemplate };
