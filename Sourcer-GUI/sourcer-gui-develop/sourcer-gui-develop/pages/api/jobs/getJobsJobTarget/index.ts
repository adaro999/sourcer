import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IGetJobsJobTargetRes } from './types';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_JOB_MANAGER_API,
});

const getJobsJobTarget = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data } = await instance.get<IGetJobsJobTargetRes>(`/api/Jobs/GetAllForDivision/${req.query.division_id}?days=365`, {
      headers: {
        'Authorization': req.headers.authorization || '',
        'Content-Type': 'application/json',
      },
    });
    const newJobArray = data.filter(element => element.job_status == 'active');

    return res.status(200).json(newJobArray);
  } catch (e) {
    return res.status(500).send({ success: false });
  }
};

export default getJobsJobTarget;
