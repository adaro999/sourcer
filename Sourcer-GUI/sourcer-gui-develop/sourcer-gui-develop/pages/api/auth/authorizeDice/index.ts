import axios from 'axios';
import { use } from 'next-api-route-middleware';
import { validToken } from '../../../../middleware';
import type { NextApiRequest, NextApiResponse } from 'next';
import { parseToken } from '../../../../middleware/util';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CORE_API,
});

const authorizeDice = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { companyId, userId, unique_name } = parseToken(req);
    const { data } = await instance.get<string>(
      `/internal/sourcing/AuthorizeDice?recruiter_id=${userId || unique_name}&company_id=${companyId}&email=${req.query.email}&password=${req.query.password}`,
    );
    res.status(200).json(data);
  } catch (e) {
    return res.status(500).send({ success: false });
  }
};

export default use(validToken(), authorizeDice);
