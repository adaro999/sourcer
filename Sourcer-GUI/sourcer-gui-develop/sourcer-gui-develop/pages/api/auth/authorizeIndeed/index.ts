import axios from 'axios';
import { use } from 'next-api-route-middleware';
import { validToken } from '../../../../middleware';
import type { NextApiRequest, NextApiResponse } from 'next';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CORE_API,
});

const authorizeIndeed = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data } = await instance.get<string>(`/internal/sourcing/AuthorizeIndeed?code=${req.query.code}&employer=${req.query.employer}&state=${req.query.state}`);
    res.status(200).json(data);
  } catch (e) {
    return res.status(500).send({ success: false });
  }
};

export default use(validToken(), authorizeIndeed);
