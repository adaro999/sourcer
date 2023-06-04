import axios from 'axios';
import { use } from 'next-api-route-middleware';
import { validToken } from '../../../../middleware';
import { parseToken } from '../../../../middleware/util';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IGetCreditsRes } from '../types';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SOURCER_API,
});

const getCredits = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId, unique_name } = parseToken(req);
    const { data } = await instance.post<IGetCreditsRes>(`/get_credits?recruiter_id=${userId || unique_name}&int_type=rli`);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).send({ success: false, error });
  }
};

export default use(validToken(), getCredits);
