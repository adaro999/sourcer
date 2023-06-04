import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IGetRateLimiterRes } from './types';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SOURCER_API,
});

// TODO: needs token auth. Remove recruiter id from query param
const rateLimiter = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data } = await instance.post<IGetRateLimiterRes>(`/rate_limiter?recruiter_id=${req.query.recruiter_id}&company_id=${req.query.company_id}`);
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).send({ success: false });
  }
};

export default rateLimiter;
