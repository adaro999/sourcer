interface IGetJobsByIdRes {
  Postings: unknown[];
  anonymous: boolean;
  apply_url: string;
  city: string;
  company_name: string;
  contact_email: null | string;
  country: string;
  created: string;
  description: string;
  division_id: number;
  education: null;
  experience: null;
  function: string;
  id: number;
  industry: string;
  name: string;
  position: string;
  postal_code: string;
  recruiter: null;
  recruiter_id: number;
  requirements: null;
  salary_high: null;
  salary_low: null;
  salary_type: null;
  state: string;
  status: string;
  travel: null;
  type: null;
}

export type { IGetJobsByIdRes };
