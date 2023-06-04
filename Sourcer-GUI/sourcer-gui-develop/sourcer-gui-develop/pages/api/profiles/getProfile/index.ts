import axios from 'axios';
import { use } from 'next-api-route-middleware';
import { validToken } from '../../../../middleware';
import { parseToken } from '../../../../middleware/util';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ICard } from '../getProfiles/types';
import { IGetProfileRes, IJBT_Response, IPDL_Response, IRLIResponse } from './types';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CORE_API,
});

// This is used to get the resume and possible enriched data
const getProfile = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { companyId, userId, unique_name } = parseToken(req);
    const convertedParams = new URLSearchParams(req?.body).toString();
    let computedCard: Partial<ICard> = {};

    // data will either be JBT, PDL or RLI response types
    const { data } = await instance.get<IGetProfileRes>(`/internal/Sourcing/getprofile?${convertedParams}&cid=${companyId}&rid=${userId || unique_name}`);

    // if RLI schema
    if ((data as IRLIResponse)?.raw_response) {
      computedCard = {
        connection: data?.connection || undefined,
        current_job_title: data?.raw_response?.latest_job_title || undefined,
        enriched_emails: data?.raw_response?.enriched_emails || undefined,
        enriched_phones: data?.raw_response?.enriched_phone || undefined,
        id: data?.connection?.profile_id || undefined,
        location: data?.raw_response?.town || undefined,
        name: {
          first_name: data?.raw_response?.first_name,
          last_name: data?.raw_response?.last_name,
        },
        notes: data?.conversationDetails?.message || undefined,
        skills: data?.raw_response?.key_skills || undefined,
        resume:
          data?.resume ||
          data?.raw_response?.data?.Resumes?.[0]?.HTMLContent ||
          data?.raw_response?.data?.resume ||
          data?.raw_response?.data?.Resumes?.[0]?.TextContent ||
          undefined,
        raw_response: data?.raw_response || undefined,
      };
    }

    // if PRL schema
    if ((data as IPDL_Response)?._source?.first_name) {
      const pdlData = data as IPDL_Response;
      computedCard = {
        connection: pdlData?.connection || undefined,
        education: pdlData?._source?.education || undefined,
        id: pdlData?.connection?.profile_id || undefined,
        job: pdlData?._source?.experience || undefined,
        location: pdlData?._source?.location_name || undefined,
        name: {
          first_name: pdlData?._source?.first_name,
          last_name: pdlData?._source?.last_name,
        },
        skills: pdlData?._source?.skills || undefined,
        source: pdlData?._source || undefined,
        enriched_emails: pdlData?._source?.enriched_emails || undefined,
        enriched_phones: pdlData?._source?.enriched_phone || undefined,
        summary: pdlData?._source?.summary,
      };
    }

    // if JBT schema
    if ((data as IJBT_Response)?._source?.response) {
      computedCard = {
        connection: data?.connection || undefined,
        education: data?._source?.response?.profile?.educations || undefined,
        enriched_emails: data?._source?.response?.profile?.enriched_emails || undefined,
        enriched_phones: data?._source?.response?.profile?.enriched_phone || undefined,
        id: data?.connection?.profile_id || undefined,
        job: data?._source?.response?.profile?.jobs || undefined,
        location: `${data?._source?.response?.profile?.location?.city} ${data?._source?.response?.profile?.location?.state}`.trim() || undefined,
        name: {
          first_name: data?._source?.response?.profile?.firstName,
          last_name: data?._source?.response?.profile?.lastName,
        },
        notes: data?.conversationDetails?.message || undefined,
        skills: data?._source?.response?.profile?.skills.reduce((arr: string[], curr: any) => [...arr, curr.name], []) || undefined,
        resume: data?._source?.response?.profile?.resumes?.[0]?.source || undefined,
        source: data?._source || undefined,
      };
    }

    // return the resume and enriched data
    return res.status(200).json(computedCard);
  } catch (e) {
    return res.status(500).send({ success: 'false', e });
  }
};

export default use(validToken(), getProfile);
