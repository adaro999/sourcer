import { IEducation } from '../../../../utils/interfaces/IEducation';
import { IExperience } from '../../../../utils/interfaces/IExperience';
import { ILabels } from '../../../../utils/interfaces/ILabels';
import { IName } from '../../../../utils/interfaces/IName';
import { ISource } from '../../../../utils/interfaces/ISource';
import { IJbtSource } from '../../../../utils/interfaces/sources/IJbtSource';
import { IPDLSource } from '../../../../utils/interfaces/sources/IPdlSource';
import { IRawResponse } from '../getProfile/types';

interface IScore {
  active_score: number;
  contact_score: number;
  date_score: number;
  final_score: number;
  job_title_score: number;
  tfidf_score: number;
}

interface IConnection {
  company_id: string;
  connection_time: string;
  isBlocked: string;
  isConnected: string;
  isPending: string;
  jobseeker_id: string;
  profile_id: string;
  recruiter_id: string;
  status: string;
}

interface ICard {
  connection?: IConnection;
  current_job_title?: string;
  education: IEducation[];
  enriched_emails?: string[];
  enriched_icon?: boolean;
  enriched_phones?: string[];
  gender?: string;
  hidden?: boolean;
  id: string;
  job: IExperience[];
  labels: ILabels;
  location: string;
  name: IName;
  notes?: string;
  saved?: boolean;
  score?: IScore;
  skills: string | string[];
  source?: ISource | IPDLSource | IJbtSource;
  type?: string;
  sources?: 'all' | 'jbt' | 'dic' | 'cab' | 'ind';
  unlocked?: boolean;
  outreach?: boolean;
  resume?: string;
  raw_response?: Partial<IRawResponse>;
  summary?: string;
}

interface IBuckets {
  doc_count: number;
  key: string;
}

// Note: radius does not get returned from the backend but something we add based on the user's selection
type IFacetsKey = 'companies' | 'degree' | 'education' | 'experience' | 'industries' | 'job_titles' | 'radius';

interface IFacets {
  buckets: IBuckets[];
  doc_count_error_upper_bound: number;
  sum_other_doc_count: number;
}

interface IMeta {
  page_no: string;
  rli_new_scroll: string;
  scroll_id: string;
  scroll_jbt_id: string;
}

interface IGetProfilesRes {
  card: ICard[];
  facets: Record<IFacetsKey, IFacets>;
  meta: IMeta;
  total_hits: number;
}

export type { ICard, IFacets, IFacetsKey, IGetProfilesRes, IMeta, IScore };
