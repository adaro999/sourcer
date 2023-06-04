interface ISource {
  candidate_hash?: string;
  candidate_status?: string;
  created_on?: string;
  desired_job_title?: string;
  distance?: number;
  driving_license?: string;
  education_level?: string;
  emails?: { address: string }[];
  email?: string;
  first_name?: string;
  hometown?: string;
  id?: string | number;
  latest_job_title?: string;
  max_salary?: string;
  min_salary?: string;
  mobile_phone?: string | number;
  personal_emails?: string[];
  phone_numbers?: string[];
  phone_number?: string;
  previous_job_titles?: string[];
  profiles?: { url?: string }[];
  relocate?: string;
  response?: any;
  resume_content?: string;
  resume_loaded?: boolean;
  resume_keywords?: string;
  resume_summary?: string;
  skills?: string[];
  source_id?: number;
  unlock_status?: string;
  unlock_url?: string | null;
  updated_on?: string;
  work_experience?: string;
  zip_code?: string;
}

export type { ISource };
