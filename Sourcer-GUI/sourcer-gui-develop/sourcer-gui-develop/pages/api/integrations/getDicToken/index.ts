import axios from 'axios';
import { use } from 'next-api-route-middleware';
import { validToken } from '../../../../middleware';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IGetDicTokenRes } from './types';

const getDicToken = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log("")
    const { data } = await axios.request<IGetDicTokenRes>({
      url: '/oauth/token',
      method: 'POST',
      baseURL: process.env.NEXT_PUBLIC_API_DICE_AUTH_URL,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': process.env.NEXT_PUBLIC_API_DICE_BASICAUTH,
      },
      auth: {
        username: process.env.NEXT_PUBLIC_API_DICE_CLIENT_ID || '',
        password: process.env.NEXT_PUBLIC_API_DICE_CLIENT_SECRET || '',
      },
      data: {
        username: req.body.email,
        password: req.body.password,
        grant_type: 'password',
        scope: '',
      },
    });
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).send({ success: false, error: e });
  }
};

export default use(validToken(), getDicToken);
