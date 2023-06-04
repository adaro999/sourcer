import axios from 'axios';
import { use } from 'next-api-route-middleware';
import { validToken } from '../../../../middleware';
import { parseToken } from '../../../../middleware/util';
import type { NextApiRequest, NextApiResponse } from 'next';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CORE_API,
});

const saveProfile = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId, unique_name } = parseToken(req);
    const { json, ...other } = req.body;
    const convertedParams = new URLSearchParams(other).toString();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { source, ...rest } = json;
    const resp = await instance.post<string>(
      `/internal/Sourcing/SaveProfile?${convertedParams}&rid=${userId || unique_name}`,
      JSON.stringify(JSON.stringify(rest)),
      {
        headers: {
          'Content-Type': 'application/json'
        },
      },
    );

    return res.status(200).json(resp.data);
  } catch (e) {
    return res.status(500).send({ success: false, e });
  }
};

export default use(validToken(), saveProfile);
