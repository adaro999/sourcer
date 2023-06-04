import { UnlockedStatus } from '../../custom_types/UnlockedStatus';

export interface IRLISource {
  candidate_hash?: string;
  candidate_status?: string | 'new';
  created_on: string | Date;
  desired_job_title: string;
  driving_license: string;
  education_level: string;
  first_name: string;
  hometown: string;
  id: number;
  latest_job_title: string;
  max_salary: number;
  min_salary: number;
  preview_job_titles: string[];
  relocate: string;
  resume_content: string;
  resume_keywords: string;
  resume_summary: string;
  skills: string[];
  source_id: number;
  unlock_status: UnlockedStatus;
  unlock_url: string | null;
  updated_on: string | Date;
  work_experience: string;
  zip: string;
}
