import { ICompany } from './ICompany';
import { ITitle } from './ITitle';

export interface IExperience {
  company?: ICompany;
  end_date?: string | null;
  endDate?: string;
  end_date_score?: number;
  is_primary?: boolean;
  isPrimary?: boolean;
  lastUpdated?: string[];
  location_names?: string[];
  mostRecent?: boolean;
  primary_score?: number;
  start_date?: string;
  startDate: string;
  summary?: string | null;
  summaries?: string[];
  title?: ITitle;
}
