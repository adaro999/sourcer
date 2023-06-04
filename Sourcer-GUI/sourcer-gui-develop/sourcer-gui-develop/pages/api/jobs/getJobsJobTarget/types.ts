interface IJob {
  city: string;
  company: string;
  country: string;
  created: string;
  division_id: number;
  job_id: number;
  job_name: string;
  job_status: string;
  position: string;
  state: string;
  updated: string | null;
}

type IGetJobsJobTargetRes = IJob[];

export type { IGetJobsJobTargetRes, IJob };
