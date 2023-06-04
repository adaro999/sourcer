import axios from 'axios';
import { use } from 'next-api-route-middleware';
import { validToken } from '../../../middleware';
import type { NextApiRequest, NextApiResponse } from 'next';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CORE_API,
});

const encrypt = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data } = await instance.post(
      '/internal/Security/Encrypt',
      { value: req.query.value },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).send({ success: false, error: e });
  }
};

export default use(validToken(), encrypt);
