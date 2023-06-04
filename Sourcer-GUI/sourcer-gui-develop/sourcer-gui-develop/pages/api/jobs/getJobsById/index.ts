import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IGetJobsByIdRes } from './types';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_JOB_MANAGER_API,
});

const getJobsById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { data } = await instance.get<IGetJobsByIdRes>(`/api/jobs/get/${req.query.job_id}?includeRecruiter=false`, {
    headers: {
      'Authorization': req.headers.authorization || '',
      'Content-Type': 'application/json',
    },
  });

  res.status(200).json(data);
};

export default getJobsById;
