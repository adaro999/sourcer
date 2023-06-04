import axios from 'axios';
import { use } from 'next-api-route-middleware';
import { validToken } from '../../../../middleware';
import { parseToken } from '../../../../middleware/util';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IGetProfilesRes } from './types';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CORE_API,
});

const getProfiles = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { companyId, userId, unique_name } = parseToken(req);
    const convertedParams = new URLSearchParams(req?.body).toString();
    const { data } = await instance.post<IGetProfilesRes>(`/internal/Sourcing/search?${convertedParams}&companyId=${companyId}&recruiterId=${userId || unique_name}`);
    const radiusBuckets = req.body.radius
      ? [
          {
            doc_count: 0,
            key: `${req.body.radius} Miles`,
          },
        ]
      : [
          {
            doc_count: 0,
            key: '5 Miles',
          },
          {
            doc_count: 0,
            key: '10 Miles',
          },
          {
            doc_count: 0,
            key: '15 Miles',
          },
          {
            doc_count: 0,
            key: '25 Miles',
          },
          {
            doc_count: 0,
            key: '50 Miles',
          },
          {
            doc_count: 0,
            key: '100 Miles',
          },
        ];

    const dataWithRadius: IGetProfilesRes = {
      ...data,
      facets: {
        ...data.facets,
        radius: {
          buckets: radiusBuckets,
          doc_count_error_upper_bound: 0,
          sum_other_doc_count: 0,
        },
      },
    };
    return res.status(200).json(req.body.where ? dataWithRadius : data);
  } catch (e) {
    return res.status(500).send({ success: false, e });
  }
};

export default use(validToken(), getProfiles);
