import axios from 'axios';
import { use } from 'next-api-route-middleware';
import { validToken } from '../../../../middleware';
import { parseToken } from '../../../../middleware/util';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IDisconnectIntegrationRes } from './types';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CORE_API,
});

const disconnectIntegration = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, unique_name } = parseToken(req);

  try {
    const { data } = await instance.post<IDisconnectIntegrationRes>(
      `/internal/Sourcing/DisconnectIntegration?integration_type=${req.query.integration_type}&recruiter_id=${userId || unique_name}`,
    );
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).send({ success: false });
  }
};

export default use(validToken(), disconnectIntegration);
