import { IPageProps } from '../../../types/types';
import { IRecruiter } from '../../organisms/CandidateContact/types';

interface IInviteFormState {
  outreachOption: number;
  checkSaveOpportunity: boolean;
  enableOutreachFollowup: boolean;
  hasError: boolean;
  hasSubmitted: boolean;
  isFetching: boolean;
  jobDetailType: string;
  jobSelect: string;
  jobCompany: string;
  jobDescription: string;
  jobLink: string;
  jobLocation: string;
  jobTitle: string;
  opportunitySelect: string;
  opportunityCompany: string;
  opportunityDescription: string;
  opportunityLocation: string;
  opportunityTitle: string;
  opportunityName: string;
  saveAsMessageTemplate: boolean;
  templateMessages: string;
  templateMessage: string;
  templateName: string;
}

interface IInviteToConnectApplyForm extends Pick<IPageProps, 'jtToken'> {
  formState: Partial<IInviteFormState>;
  updateForm: (obj: Partial<IInviteFormState>) => void;
  recruiter: IRecruiter;
}

interface IList {
  text: string;
  value: string;
}

export type { IInviteFormState, IInviteToConnectApplyForm, IList };
