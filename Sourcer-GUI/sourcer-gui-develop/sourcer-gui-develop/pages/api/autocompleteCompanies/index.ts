import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IGetCompaniesRes } from './types';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SOURCER_API,
});

const autocompleteCompanies = async (req: NextApiRequest, res: NextApiResponse) => {
  const { data } = await instance.post<IGetCompaniesRes>(
    `/autocomplete_company?
      company=${req.query.job_id}&
      `,
  );
  res.status(200).json(data);
};

export default autocompleteCompanies;
