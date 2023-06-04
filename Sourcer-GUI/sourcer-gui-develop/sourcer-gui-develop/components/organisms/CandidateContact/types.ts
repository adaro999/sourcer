import { Dispatch } from 'react';
import { ICard } from '../../../pages/api/profiles/getProfiles/types';
import { IPageProps } from '../../../types/types';
import { IProfileCardReducerAction } from '../../../hooks/useProfileCardController/types';

interface IRecruiter {
  company_id?: string;
  division_id?: string;
  recruiter_id?: string;
  firstName?: string;
  lastName?: string;
}

interface ICandidateContact extends Pick<IPageProps, 'jtToken'> {
  card?: Partial<ICard>;
  name?: string;
  onRouteChange?: () => void;
  profile_id?: string;
  resume?: string;
  recruiter: IRecruiter;
  setCardState?: Dispatch<IProfileCardReducerAction>;
}

export type { IRecruiter, ICandidateContact };
