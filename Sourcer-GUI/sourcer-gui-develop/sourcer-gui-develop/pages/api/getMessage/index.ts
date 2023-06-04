import axios from 'axios';
import { use } from 'next-api-route-middleware';
import { validToken } from '../../../middleware';
import { parseToken } from '../../../middleware/util';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IGetMessageRes } from './types';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SOURCER_API,
});

const getMessage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, unique_name } = parseToken(req);
  const { data } = await instance.post<IGetMessageRes>(`/retrieve_message?profile_id=${req.query.profile_id}&recruiter_id=${userId || unique_name}`);

  res.status(200).json(data);
};

export default use(validToken(), getMessage);
