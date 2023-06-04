import axios from 'axios';
import { use } from 'next-api-route-middleware';
import { validToken } from '../../../../middleware';
import { parseToken } from '../../../../middleware/util';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IGetUnlockedProfileRes } from './types';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SOURCER_API,
});

const getUnlockedProfile = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { companyId, userId, unique_name } = parseToken(req);
    const convertedParams = new URLSearchParams(req?.body).toString();
    const { data } = await instance.post<IGetUnlockedProfileRes>(`/get_unlocked_profile?${convertedParams}&company_id=${companyId}&recruiter_id=${userId || unique_name}`);
    res.status(200).json(data);
  } catch (e) {
    return res.status(500).send({ success: false });
  }
};

export default use(validToken(), getUnlockedProfile);
