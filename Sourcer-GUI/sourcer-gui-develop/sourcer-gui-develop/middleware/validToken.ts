import { Middleware } from 'next-api-route-middleware';
import { parseToken } from './util';

// checks whether the incoming request has a valid jwt or not
const validToken = (): Middleware => {
  return async function (req, res, next) {
    try {
      const isValid = parseToken(req);
      if (isValid) return next();
    } catch {
      return res.status(401).send({ message: 'Not Authorized. Token is not valid' });
    }
  };
};

export { validToken };
