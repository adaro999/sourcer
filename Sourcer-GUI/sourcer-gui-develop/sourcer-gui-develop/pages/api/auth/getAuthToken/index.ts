import axios from 'axios';
import { use } from 'next-api-route-middleware';
import { validToken } from '../../../../middleware';
import { parseToken } from '../../../../middleware/util';
import type { NextApiRequest, NextApiResponse } from 'next';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CORE_API,
});

// TODO
// cab = 1
// dic = 2
const getAuthToken = async (req: NextApiRequest, res: NextApiResponse) => {
  const { companyId, userId, unique_name } = parseToken(req);
  const { data } = await instance.get<string>(
    `/internal/Sourcing/GetAuthTokenPub?recruiter_id=${userId || unique_name}&integration_type=${req.query.integration_type}&company_id=${companyId}`,
    {
      headers: {
        'Authorization': req.headers.authorization || '',
        'Content-Type': 'application/json',
      },
    },
  );

  res.status(200).json(data);
};

export default use(validToken(), getAuthToken);
