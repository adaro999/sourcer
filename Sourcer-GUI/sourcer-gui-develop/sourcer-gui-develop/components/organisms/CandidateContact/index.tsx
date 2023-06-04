import React, { FormEvent, PropsWithChildren, useReducer, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Col, Form, Alert } from 'reactstrap';
import { ContactInformation } from '../ContactInformation';
import { EnrichedRibbon } from '../../molecules/EnrichedRibbon';
import { InviteToConnectApplyForm } from '../../molecules/InviteToConnectApplyForm';
import { inviteFormReducer, inviteFormState } from '../../molecules/InviteToConnectApplyForm/reducer';
import { ProfileUnlocked } from '../../molecules/ProfileUnlocked';
import { pushAnalyticsEvent } from '../../../utils/analytics';
import { SentOutreachMessage } from '../../molecules/SentOutreachMessage';
import { SentOutreachEmail } from '../../molecules/SentOutreachEmail';
import { getMessageAndProfile, jobSeekerMessage, saveJob, saveTemplate } from '../../../api';
import { buildContactInfoArray } from '../../../utils';
import { getTitleAndCTA } from './util';
import { ICandidateContact } from './types';
import { IJobDetails } from '../../molecules/SentOutreachEmail/types';

const CandidateContact = ({
  children,
  card,
  jtToken,
  name,
  onRouteChange = () => {},
  profile_id,
  resume,
  recruiter,
  setCardState = () => {},
}: PropsWithChildren<ICandidateContact>) => {
  const router = useRouter();
  const [activeScreen, setActiveScreen] = useState(0);
  const [inviteForm, setInviteForm] = useReducer(inviteFormReducer, inviteFormState);
  const [jobDetails, setJobDetails] = useState<Partial<IJobDetails>>();
  const [activeResume, setActiveResume] = useState(resume);
  const [activeCard, setActiveCard] = useState(card);
  const [validated, setValidated] = useState(false);
  const [warningMsg, setWarningMsg] = useState('');
  const { cta, title } = getTitleAndCTA(activeScreen);

  // The screen that builds a review of what the outreach message will look like
  const ReviewComponent = () => (
    <SentOutreachEmail name={name} jobDetails={jobDetails} jobLocation={inviteForm.opportunityLocation} jobTitle={inviteForm.opportunityTitle} {...inviteForm}>
      <SentOutreachMessage message={inviteForm.templateMessage} {...{ recruiter }} />
    </SentOutreachEmail>
  );

  // The screen after the outreach message has been sent and you can look at the profile details
  const SentComponent = () => (
    <div>
      <ProfileUnlocked />
      <ContactInformation isEnriched={activeCard?.enriched_icon} items={buildContactInfoArray(activeCard)}>
        {activeCard?.enriched_icon && <EnrichedRibbon position="left-top" />}
        <Button
          color="primary"
          data-toggle="offcanvas"
          onClick={() => {
            // close the existing panel, wait for it to close and then open the 'unlocked' panel
            setCardState({ type: 'panel', payload: { isOpen: false } });
            window.setTimeout(() => {
              setCardState({ type: 'panel', payload: { content: 'unlocked', isOpen: true, variant: 'small' } });
            }, 400);
          }}
          outline
          type="button"
        >
          View Sent Message
        </Button>
      </ContactInformation>
      {children}
    </div>
  );

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setInviteForm({ hasSubmitted: true });
    setValidated(false);
    pushAnalyticsEvent.BrowserExtension('Browser Ext, Successful');
    pushAnalyticsEvent('Send Message');

    // TODO: improve form validation
    // check required fields for job options
    if (activeScreen === 0) {
      if ((inviteForm.jobSelect === '' || inviteForm.jobSelect === 'Select job from JobTarget') && inviteForm.jobDetailType === 'use-jobs') {
        setWarningMsg('Please select job from JobTarget options');
        return false;
      }
      if (inviteForm.jobDetailType === 'use-opportunities') {
        if (
          inviteForm.opportunityTitle?.trim() === '' ||
          inviteForm.opportunityDescription?.trim() === '' ||
          inviteForm.opportunityLocation?.trim() === '' ||
          inviteForm.opportunityCompany?.trim() === ''
        ) {
          setWarningMsg('Please fill out required fields for Job Details');
          return false;
        }
        if (inviteForm.checkSaveOpportunity && inviteForm.opportunityName?.trim() === '') {
          setWarningMsg('Please enter an opportunity name');
          return false;
        }
      }
      if (inviteForm.jobDetailType === '') {
        setWarningMsg('Please choose an option for Job Details');
        return false;
      }
      // check required fields for message to candidate
      if (inviteForm.outreachOption === 0) {
        if (inviteForm.outreachOption === 0 && inviteForm.templateMessage?.trim() === '') {
          setWarningMsg('Please enter message to candidate');
          return false;
        }
        if (inviteForm.saveAsMessageTemplate && inviteForm.templateName?.trim() === '') {
          setWarningMsg('Please enter a message template name');
          return false;
        }
      }
    }

    let jobDescription;

    // normalize job description schema for payload
    if (inviteForm.jobDetailType === 'use-opportunities') {
      jobDescription = {
        job_title: inviteForm.opportunityTitle,
        jobDescription_text: inviteForm.opportunityDescription,
        jobDescription_location: inviteForm.opportunityLocation,
        jobDescription_company: inviteForm.opportunityCompany,
      };
    } else {
      jobDescription = {
        job_title: inviteForm.jobTitle,
        jobDescription_text: inviteForm.jobDescription,
        jobDescription_location: inviteForm.jobLocation,
        jobDescription_company: inviteForm.jobCompany,
        jobDescription_link: inviteForm.jobLink,
      };
    }

    setJobDetails(jobDescription);

    if (activeScreen === 1) {
      // send message after preview screen
      setInviteForm({ hasError: false, isFetching: true });

      if (inviteForm.checkSaveOpportunity) {
        saveJob({
          job_title: jobDescription.job_title || '',
          job_description: jobDescription.jobDescription_text || '',
          job_location: jobDescription.jobDescription_location || '',
          job_company: jobDescription.jobDescription_company || '',
          sourcing_oppurtunity_name: inviteForm.opportunityName || '',
          token: jtToken || '',
        });
      }

      if (inviteForm.saveAsMessageTemplate) {
        saveTemplate({
          body: inviteForm.templateMessage || '',
          template_name: inviteForm.templateName || '',
          token: jtToken || '',
        });
      }

      // send the message to the candidate
      const jobSeekerData = await jobSeekerMessage({
        body: encodeURIComponent(inviteForm.templateMessage || ''),
        jobDescriptionCompany: jobDescription.jobDescription_company || '',
        jobDescriptionLocation: jobDescription.jobDescription_location || '',
        jobDescriptionLink: jobDescription.jobDescription_link || '',
        jobDescriptionText: encodeURIComponent(jobDescription.jobDescription_text || ''),
        jobTitle: jobDescription.job_title || '',
        pphOptIn: inviteForm.enableOutreachFollowup?.toString() || '',
        profileId: profile_id || '',
        token: jtToken || '',
      });

      if (jobSeekerData?.status == 1 || jobSeekerData?.status_code == 202) {
      } else {
        // jobSeekerMessage failed and we need to show an error instead of moving to the next screen
        setInviteForm({ hasError: true, isFetching: false });
        setWarningMsg('Invite did not send. Connection issue.');
        return;
      }

      const { profile } = await getMessageAndProfile({
        profile_id: profile_id || '',
        getConversation: false,
        getCredits: false,
        token: jtToken || '',
      });

      if (profile) {
        const newCard = {
          ...profile,
          ...profile.raw_response,
          enriched_phones: profile.enriched_phones,
          name: {
            first_name: profile.raw_response?.first_name || '',
            last_name: profile.raw_response?.last_name || '',
          },
        };

        // refresh page with unlocked resume and contact information
        setActiveCard(newCard);
        setActiveResume(profile.resume);
      }

      // reset form
      setInviteForm(inviteFormState);
      setInviteForm({ isFetching: false });
      // all form field validations passed
      setValidated(true);
    }

    if (activeScreen === 2) {
      // The call to action button on this screen is 'View My Candidates'
      onRouteChange();
      router.push('/candidates');
    }

    if (activeScreen !== 2) {
      // Get the reference to the offcanvas div,
      // move to the next screen as long as we're not on the last screen
      // and then scroll to the top of the offcanvas
      const offcanvasDiv = document.querySelector('[data-component="offcanvas"]');

      setActiveScreen(oldState => oldState + 1);
      offcanvasDiv?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div data-testid="candidate-contact">
      <div className="border-bottom pointer-event-none">
        <Col className="pt-2 pb-4 pl-0">
          <h4 className="mb-0">Contact Candidate</h4>
        </Col>
      </div>
      {activeScreen === 2 && (
        <div className="px-4 pt-4">
          <Alert variant="success">Message successfully sent to candidate</Alert>
        </div>
      )}
      <div className={`px-0 ${activeScreen === 2 ? 'py-2' : 'py-4'}`}>
        <Col className="pr-0 pl-0">
          <Form onSubmit={handleSubmit} name="contact-form">
            {title && <div className="h5 font-weight-light pb-3">{title}</div>}
            <div className="p-4 border">
              {activeScreen === 0 && <InviteToConnectApplyForm formState={inviteForm} updateForm={setInviteForm} {...{ recruiter, jtToken }} />}
              {activeScreen === 1 && <ReviewComponent />}
              {activeScreen === 2 && <SentComponent />}
              <div className="d-flex justify-content-between pt-3 pb-4">
                <Button
                  className="mr-1 py-3 w-100"
                  outline
                  onClick={() => {
                    // if we have submitted the form, close the offcanvas
                    if (activeScreen === 2) {
                      // close the offcanvas
                      onRouteChange();
                      window.close();
                      return;
                    }

                    // reset the form fields and move back to the first screen
                    setActiveScreen(0);
                    setInviteForm({ ...inviteFormState, isFetching: false });
                    setWarningMsg('');
                  }}
                >
                  <span className="h5 font-weight-light">{activeScreen === 2 ? `Close This Tab` : `Cancel`}</span>
                </Button>
                <Button form="contact-form" className="ml-1 py-3 w-100" onClick={handleSubmit} color="primary" type="submit" disabled={inviteForm.isFetching}>
                  <span className="h5 font-weight-light text-white">{inviteForm.isFetching && activeScreen === 1 ? <>Sending...</> : <>{cta}</>}</span>
                </Button>
              </div>
              {inviteForm.hasSubmitted && !validated && warningMsg && <Alert color="danger">{warningMsg}</Alert>}
              <div className="bg-blue-20 text-dark-primary text-center small border rounded mt-4 p-3">
                Sending message will expend 1 credit and unlock contact information for this candidate.
              </div>
            </div>
          </Form>
        </Col>
      </div>
    </div>
  );
};

export { CandidateContact };
