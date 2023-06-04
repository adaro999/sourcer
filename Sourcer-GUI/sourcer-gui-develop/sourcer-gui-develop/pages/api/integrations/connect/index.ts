import axios from 'axios';
import { use } from 'next-api-route-middleware';
import { validToken } from '../../../../middleware';
import { parseToken } from '../../../../middleware/util';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IConnectIntegrationRes } from './types';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CORE_API,
});

const connectIntegration = async (req: NextApiRequest, res: NextApiResponse) => {
  const { companyId, userId, unique_name } = parseToken(req);

  try {
    const { data } = await instance.post<IConnectIntegrationRes>(
      `/internal/Sourcing/ConnectIntegration
      ?integration_type=${req.query.integration_type}
      &recruiter_id=${userId || unique_name}
      &company_id=${companyId}
      &access_token=${req.query.access_token}
      &refresh_token=${req.query.refresh_token}`,
    );
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).send({ success: false });
  }
};

export default use(validToken(), connectIntegration);
