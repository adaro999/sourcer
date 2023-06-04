import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IGetTitlesRes } from './types';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SOURCER_API,
});

const autocompleteTitles = async (req: NextApiRequest, res: NextApiResponse) => {
  const { data } = await instance.post<IGetTitlesRes>(
    `/autocomplete_company?
      company=${req.query.job_id}&
      `,
  );
  res.status(200).json(data);
};

export default autocompleteTitles;
