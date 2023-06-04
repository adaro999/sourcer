import { NextApiRequest } from 'next';
import jwt from 'jsonwebtoken';
import { IJTToken } from './types';

// lowercases all of the query params keys
const toLower = (params: NextApiRequest['query']): NextApiRequest['query'] => {
  return Object.entries(params).reduce((acc, curr) => ({ ...acc, [curr[0].toLowerCase()]: curr[1] }), {});
};

// helper to pull the token value from auth header or query param
const getToken = (req: NextApiRequest) => {
  const lowerQuery = toLower(req.query);

  // check the bearer token
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];

    // check the jttoken query param
  } else if (lowerQuery?.jttoken) {
    return lowerQuery.jttoken.toString();
  }

  return '';
};

const parseToken = (req: NextApiRequest) => jwt.verify(getToken(req), process.env.NEXT_PUBLIC_AUTH_JWT_SECRET || '') as IJTToken;

export { getToken, parseToken, toLower };
