import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SOURCER_API,
});

const encryptProfileId = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data } = await instance.post(`/profile_encrypt?profile_id=${req.query.profile_id}`);
    return res.status(200).json(data.indexOf('&name') > 0 ? data.split('&name')[0] : data);
  } catch (e) {
    return res.status(500).send({ success: false, error: e });
  }
};

export default encryptProfileId;
