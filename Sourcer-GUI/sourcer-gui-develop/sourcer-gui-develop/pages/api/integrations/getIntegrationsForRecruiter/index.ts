import axios from 'axios';
import { use } from 'next-api-route-middleware';
import { validToken } from '../../../../middleware';
import { parseToken } from '../../../../middleware/util';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IGetIntegrationsForRecruiterRes } from './types';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CORE_API,
});

const getIntegrationsForRecruiter = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId, unique_name } = parseToken(req);
    const { data } = await instance.get<IGetIntegrationsForRecruiterRes>(`/internal/Sourcing/GetIntegrationsForRecruiter?recruiter_id=${userId || unique_name}`);
    return res.status(200).json(Array.isArray(data.value) ? data.value : []);
  } catch (e) {
    return res.status(500).send({ success: false, e });
  }
};

export default use(validToken(), getIntegrationsForRecruiter);
