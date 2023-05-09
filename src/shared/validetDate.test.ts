import 'jest';
import { isValidDate, dateIsValid } from './validetDate';

describe('ValidDate', () => {
  it('must handle a "string" object and returns that it is not valid', () => {  
    const result = isValidDate('2023-05-08');
    expect(result).toBe(false);
  });

  it('must handle a "date" object and returns that it is valid', () => {  
    const result = isValidDate(new Date('2023-05-08'));
    expect(result).toBe(true);
  });

  it('must handle a "date" object and returns that it is not valid', () => {  
    const result = isValidDate(new Date('1799-12-31'));
    expect(result).toBe(false);
  });

  it('must deal with a date in string format and returns that it is valid', () => {
    const result = dateIsValid('2023-05-08');
    expect(result).toBe(true);
  });
  
  it('must handle a leap year date in string format and returns that it is valid', () => {
    const result = dateIsValid('2023-02-29');
    expect(result).toBe(false);
  });

  it('must handle a string that is not a date and returns that is not valid', () => {
    const result = dateIsValid('AAAA-AA-AA');
    expect(result).toBe(false);
  });

  it('must handle a date format string that is not a valid date', () => {
    const result = dateIsValid('0000-00-00');
    expect(result).toBe(false);
  });
});