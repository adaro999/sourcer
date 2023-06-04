import { getFilteredOptions } from './util';

describe('getFilteredOptions', () => {
  it('filters out false values', () => {
    const assert1 = getFilteredOptions({ 'company': { company1: true, company2: false }, 'job title': { job1: true, job2: true, job3: false } });
    const assert2 = getFilteredOptions({ 'company': { company1: false, company2: false }, 'job title': { job1: false, job2: true, job3: false } });

    expect(assert1).toEqual({ 'company': { company1: true }, 'job title': { job1: true, job2: true } });
    expect(assert2).toEqual({ 'job title': { job2: true } });
  });
});
