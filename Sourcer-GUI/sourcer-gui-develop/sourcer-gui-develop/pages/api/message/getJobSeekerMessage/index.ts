import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IGetJobSeekerMessageRes } from './types';

// TODO: needs token auth. Remove recruiter id from query param
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SOURCER_API,
});

const getJobSeekerMessage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { data } = await instance.post<IGetJobSeekerMessageRes>(`/retrieve_message?profile_id=${req.query.profile_id}&recruiter_id=${req.query.recruiter_id}`);

  res.status(200).json(data);
};

export default getJobSeekerMessage;
