import axios from 'axios';
import { use } from 'next-api-route-middleware';
import { validToken } from '../../../../middleware';
import { parseToken } from '../../../../middleware/util';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IGetCreditsRes } from '../types';
import { IGetIntegrationsForRecruiterRes } from '../../integrations/getIntegrationsForRecruiter/types';

const coreInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CORE_API,
});

const sourcerInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SOURCER_API,
});

const getConnectedCredits = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { companyId, userId, unique_name } = parseToken(req);

    // integrations
    const { data } = await coreInstance.get<IGetIntegrationsForRecruiterRes>(`/internal/Sourcing/GetIntegrationsForRecruiter?recruiter_id=${userId || unique_name}`);

    // all credits
    const { data: creditsData } = await coreInstance.get<IGetCreditsRes>(`/internal/Sourcing/GetAllCredits?cid=${companyId}&rid=${userId || unique_name}`);

    // TODO: might not need this call since its what GetAllCredits is returning. Need to look into this some more
    // rli credits
    const { data: rliCreditsData } = await sourcerInstance.post<IGetCreditsRes>(`/get_credits?recruiter_id=${userId || unique_name}&int_type=rli`);
    const rliCredits = { type: 'all', credits: Number(rliCreditsData?.rli.premium_credits_available || 0) };

    // check if the user has integrations in the 'value' array
    if (Array.isArray(data?.value) && data.value.length > 0) {
      const computedData = data.value
        // remove any old 'lever' integration types that might come through
        .filter(elm => elm.integration_type !== 'lev')
        // return them as an array [{type: 'cab', credits: 200}, etc]
        .reduce(
          (acc: { credits: number; type: string }[], curr) => [
            ...acc,
            { type: curr.integration_type, credits: Number(creditsData[curr.integration_type]?.premium_credits_available) || 0 },
          ],
          // initialize the array with the results of the rliCredits
          [rliCredits],
        );

      return res.status(200).json(computedData);
    } else {
      return res.status(200).json([rliCredits]);
    }
  } catch (error) {
    return res.status(500).send({ success: false, error });
  }
};

export default use(validToken(), getConnectedCredits);
