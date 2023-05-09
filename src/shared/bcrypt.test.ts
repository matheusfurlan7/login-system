import 'jest';
import { encrypt, compare } from './bcrypt';

describe('bcryptr', () => {
  it('must handle a password and return it encrypted', () => {
    const password = 'MatheusFurlan@1998';
    const hash = encrypt(password);
    
    expect(hash.length).toBe(60);
  });

  it('should compare a password encrypted with origin password', () => {
    const password = 'MatheusFurlan@1998';
    const hash = '$2b$10$fyjbpcAlqkobsTb79/u8Buo4JxMZiLCE1q.sds0DYnXTY0aD297Ii';
    const result = compare(password, hash);
    
    expect(result).toBe(true);
  });
  
  it('should handle encrypting a password and compare correctly', () => {
    const password = 'furlan_(12$';
    const hash = encrypt(password);
    const result = compare(password, hash);

    expect(result).toBe(true);
  });  
});