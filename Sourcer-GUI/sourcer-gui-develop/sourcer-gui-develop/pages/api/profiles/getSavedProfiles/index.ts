import axios from 'axios';
import { use } from 'next-api-route-middleware';
import { validToken } from '../../../../middleware';
import { parseToken } from '../../../../middleware/util';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IGetProfileRes } from '../getProfile/types';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CORE_API,
});

const getSavedProfiles = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, unique_name } = parseToken(req);
  const convertedParams = new URLSearchParams(req?.body).toString();
  try {
    const { data } = await instance.get<IGetProfileRes>(`/internal/Sourcing/GetSavedProfiles?${convertedParams}&rid=${userId || unique_name}`);
    res.status(200).json(data);
  } catch (e) {
    return res.status(500).send({ success: false });
  }
};

export default use(validToken(), getSavedProfiles);
