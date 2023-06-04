import axios from 'axios';
import { use } from 'next-api-route-middleware';
import { validToken } from '../../../../middleware';
import { parseToken } from '../../../../middleware/util';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IGetCreditsRes } from '../types';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CORE_API,
});

const getAllCredits = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { companyId, userId, unique_name } = parseToken(req);
    const { data } = await instance.get<IGetCreditsRes>(`/internal/Sourcing/GetAllCredits?cid=${companyId}&rid=${userId || unique_name}`);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).send({ success: false, error });
  }
};

export default use(validToken(), getAllCredits);
