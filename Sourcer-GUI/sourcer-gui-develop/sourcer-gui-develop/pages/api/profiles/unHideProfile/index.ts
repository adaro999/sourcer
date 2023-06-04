import axios from 'axios';
import { use } from 'next-api-route-middleware';
import { validToken } from '../../../../middleware';
import { parseToken } from '../../../../middleware/util';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IUnHideProfileRes } from './types';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CORE_API,
});

const unHideProfile = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId, unique_name } = parseToken(req);
    const { data } = await instance.post<IUnHideProfileRes>(`/internal/Sourcing/UnHideProfile?pid=${req.query.pid}&rid=${userId || unique_name}`);
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).send({ success: false });
  }
};

export default use(validToken(), unHideProfile);
