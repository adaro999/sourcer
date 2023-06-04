import axios from 'axios';
import { use } from 'next-api-route-middleware';
import { validToken } from '../../../../middleware';
import { parseToken } from '../../../../middleware/util';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IGetIndeedAuthRes } from './types';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CORE_API,
});

const getIndeedAuthCreds = async (req: NextApiRequest, res: NextApiResponse) => {
  const { companyId, userId, unique_name } = parseToken(req);

  const { data } = await instance.post<IGetIndeedAuthRes>(`/internal/Sourcing/GetIndeedAuthCredsPub?recruiter_id=${userId || unique_name}&company_id=${companyId}`);
  res.status(200).json(data);
};

export default use(validToken(), getIndeedAuthCreds);
