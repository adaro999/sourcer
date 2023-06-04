interface IJobDetails {
  job_title: string;
  jobDescription_text: string;
  jobDescription_location: string;
  jobDescription_company: string;
  jobDescription_link?: string;
}

interface ISentOutreact {
  jobDetails?: Partial<IJobDetails>;
  jobDescription?: string;
  jobLocation?: string;
  jobTitle?: string;
  name?: string;
}

export type { IJobDetails, ISentOutreact };
