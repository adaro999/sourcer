import { stringifyTimePassedDetails } from './util';

describe('Unit test for renderTimePassedDetails', () => {
  const currentDate = '2023-01-18T20:58:11Z';

  it('should be more than 6 months ago', () => {
    const funcReturnedString = stringifyTimePassedDetails('2022-05-25T18:06:11Z', currentDate);
    expect(funcReturnedString).toEqual(undefined);
  });

  it('should be between 1 month to 6 months ago', () => {
    const funcReturnedString = stringifyTimePassedDetails('2022-11-25T18:06:11Z', currentDate);
    expect(funcReturnedString).toEqual('1 month');
  });

  it('should be between 1 week to 3 weeks ago', () => {
    const funcReturnedString = stringifyTimePassedDetails('2022-12-24T05:13:02Z', currentDate);
    expect(funcReturnedString).toEqual('3 weeks');
  });

  it('should be between 1 day to 30 days ago', () => {
    const funcReturnedString = stringifyTimePassedDetails('2023-01-16T16:59:41Z', currentDate);
    expect(funcReturnedString).toEqual('2 days');
  });

  it('should be between 1 hour and less than 24 hours ago', () => {
    const funcReturnedString = stringifyTimePassedDetails('2023-01-18T10:55:27Z', currentDate);
    expect(funcReturnedString).toEqual('10 hours');
  });

  it('should be 1 minute to 59 minutes', () => {
    const funcReturnedString = stringifyTimePassedDetails('2023-01-18T20:30:27Z', currentDate);
    expect(funcReturnedString).toEqual('27 minutes');
  });
});
