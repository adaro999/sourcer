import axios from 'axios';
import { use } from 'next-api-route-middleware';
import { validToken } from '../../../../middleware';
import { parseToken } from '../../../../middleware/util';
import { encryptString } from '../../../../utils';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IJobSeekerMessageRes } from './types';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import * as uuid from 'uuid';

// TODO: needs token auth. Remove recruiter id from query param
const client = new DynamoDBClient({});
const saveToDb = async (payload: any, profileId: string) => {
  const { companyId, recruiterId } = payload;
  try {
    const Item = {
      id: { S: uuid.v4() },
      company_id: { S: companyId },
      content: { S: JSON.stringify(payload) },
      create_date: { S: new Date().toISOString() },
      message_id: { S: `${recruiterId}-${profileId}` },
      profile_id: { S: profileId },
      recruiter_id: { S: recruiterId },
    };
    await client.send(
      new PutItemCommand({
        TableName: process.env.TABLE_NAME,
        Item: Item,
      }),
    );
    console.info(`Outreach saved to database`);
    return true;
  } catch (e) {
    console.error('Error saving to database:', e);
    return false;
  }
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CORE_API,
});

const jobSeekerMessage = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { companyId, userId, unique_name } = parseToken(req);
    const payload = {
      ...req.body,
      companyId: companyId,
      recruiterId: userId || unique_name,
      encryptedProfileId: encodeURIComponent(encryptString(req.body.profileId)),
    };

    // save to database
    await saveToDb(payload, req.body.profileId);

    // send to JobSeeker
    const { data } = await instance.post<IJobSeekerMessageRes>('/internal/sourcing/Jobseekermessage', payload);

    if (data) {
      return res.status(200).json(data);
    }
  } catch (e) {
    return res.status(500).send({ success: false, error: e });
  }
};

export default use(validToken(), jobSeekerMessage);
