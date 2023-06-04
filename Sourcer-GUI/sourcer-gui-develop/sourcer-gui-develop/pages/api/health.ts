import packagejson from '../../package.json';
import type { NextApiRequest, NextApiResponse } from 'next';

const health = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ status: 'ok', time: new Date(), version: packagejson.version });
};

export default health;
