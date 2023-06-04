import axios from 'axios';
import { use } from 'next-api-route-middleware';
import { validToken } from '../../../../middleware';
import { parseToken } from '../../../../middleware/util';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IGetCreditsRes } from '../types';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SOURCER_API,
});

const getIntegrationsCredits = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { companyId, userId, unique_name } = parseToken(req);
    const { data } = await instance.post<IGetCreditsRes>(
      `/get_credits?
      company_id=${companyId}&
      recruiter_id=${userId || unique_name}&
      cab_token=${req.body.cabToken}&
      dic_token=${req.body.dicToken}&
      int_type=rli`,
    );

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).send({ success: false, error });
  }
};

export default use(validToken(), getIntegrationsCredits);
