import axios from 'axios';
import { use } from 'next-api-route-middleware';
import { validToken } from '../../../../middleware';
import type { NextApiRequest, NextApiResponse } from 'next';
import { parseToken } from '../../../../middleware/util';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CORE_API,
});

const authorizeCab = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { companyId, userId, unique_name } = parseToken(req);
    const { data } = await instance.get<string>(`/internal/sourcing/AuthorizeCab?recruiter_id=${userId || unique_name}&company_id=${companyId}&code=${req.query.code}`);
    res.status(200).json(data);
  } catch (e) {
    return res.status(500).send({ success: false });
  }
};

export default use(validToken(), authorizeCab);
