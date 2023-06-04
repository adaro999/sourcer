import axios from 'axios';
import { use } from 'next-api-route-middleware';
import { validToken } from '../../../../middleware';
import { parseToken } from '../../../../middleware/util';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IGetEmailTemplatesRes } from './types';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CORE_API,
});

const getEmailTemplates = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { companyId, userId, unique_name } = parseToken(req);
    const { data } = await instance.get<IGetEmailTemplatesRes[]>(`/internal/Sourcing/Getemailtemplates?rid=${userId || unique_name}&cid=${companyId}`);
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).send({ success: false });
  }
};

export default use(validToken(), getEmailTemplates);
