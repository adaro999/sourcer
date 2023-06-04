import { IRecruiter } from '../../organisms/CandidateContact/types';

interface ISentOutreactMessage {
  message?: string;
  firstName?: string;
  lastName?: string;
  recruiter?: IRecruiter;
}

export type { ISentOutreactMessage };
