import { IInviteFormState } from './types';

const inviteFormState: IInviteFormState = {
  outreachOption: 0,
  checkSaveOpportunity: false,
  enableOutreachFollowup: false,
  hasError: false,
  hasSubmitted: false,
  isFetching: false,
  jobDetailType: 'use-jobs',
  jobSelect: 'Select job from JobTarget',
  jobCompany: '',
  jobDescription: '',
  jobLink: '',
  jobLocation: '',
  jobTitle: '',
  opportunitySelect: '',
  opportunityCompany: '',
  opportunityDescription: '',
  opportunityLocation: '',
  opportunityTitle: '',
  opportunityName: '',
  saveAsMessageTemplate: false,
  templateMessages: '',
  templateMessage: '',
  templateName: '',
};

const inviteFormReducer = (state: Partial<IInviteFormState>, action: Partial<IInviteFormState>) => ({
  ...state,
  ...action,
});

export { inviteFormReducer, inviteFormState };
