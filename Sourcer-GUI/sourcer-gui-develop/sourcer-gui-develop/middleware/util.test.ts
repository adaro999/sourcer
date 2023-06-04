import { NextApiRequest } from 'next';
import { getToken, toLower } from './util';

describe('toLower', () => {
  it('lowercases all object keys', () => {
    const assert = toLower({
      ONE: 'one',
      tWo: 'two',
      tHReE: 'three',
    });

    expect(assert).toStrictEqual({
      one: 'one',
      two: 'two',
      three: 'three',
    });
  });
});

describe('getToken', () => {
  it('gets the token from the authorization header or query param', () => {
    const assert1 = getToken({ headers: { authorization: 'Bearer bearertokenvalue' }, query: { JTTOKEN: '123' } } as unknown as NextApiRequest);
    const assert2 = getToken({ headers: { authorization: '' }, query: { JTTOKEN: 'querytokenvalue', somethingElse: '12344' } } as unknown as NextApiRequest);
    const assert3 = getToken({ headers: { authorization: '' }, query: { JTTOKEN: '' } } as unknown as NextApiRequest);
    const assert4 = getToken({ headers: { authorization: '' }, query: { jtToken: 'querytokenvalue', somethingElse: '12344' } } as unknown as NextApiRequest);

    expect(assert1).toBe('bearertokenvalue');
    expect(assert2).toBe('querytokenvalue');
    expect(assert3).toBe('');
    expect(assert4).toBe('querytokenvalue');
  });
});
