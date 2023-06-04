import { UnlockedStatus } from '../custom_types/UnlockedStatus';

interface ILabels {
  candidate_id?: null | string;
  contact_score?: null | string | number;
  date_score?: null | string | number;
  emails?: string[];
  experience_years: number | string;
  final_score?: null | string | number;
  last_updated?: string | Date;
  salary: string | null;
  tdfidf?: null | string | number;
  unlock_status?: UnlockedStatus;
}

export type { ILabels };
