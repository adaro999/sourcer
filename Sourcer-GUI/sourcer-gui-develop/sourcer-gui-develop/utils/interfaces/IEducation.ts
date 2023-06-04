import { ISchool } from './ISchool';

export interface IEducation {
  degrees: string[];
  endDate?: string;
  end_date?: string | null;
  end_date_score?: number;
  gpa?: string[];
  majors?: string[];
  minors?: string[];
  school?: ISchool;
  start_date?: string | null;
  startDate?: string;
  summary?: string | null;
  summaries?: string[];
}
