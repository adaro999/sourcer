import axios from 'axios';
import { use } from 'next-api-route-middleware';
import { validToken } from '../../../../middleware';
import { parseToken } from '../../../../middleware/util';
import type { NextApiRequest, NextApiResponse } from 'next';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CORE_API,
});

const saveProfileNotes = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId, unique_name } = parseToken(req);
    const convertedParams = new URLSearchParams(req?.body).toString();
    const { data } = await instance.post<string>(`/internal/Sourcing/SaveProfileNotes?${convertedParams}&rid=${userId || unique_name}`);
    res.status(200).json(data);
  } catch (e) {
    return res.status(500).send({ success: false });
  }
};

export default use(validToken(), saveProfileNotes);
