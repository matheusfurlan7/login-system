import bcrypt from 'bcrypt';

export function encrypt(password: string): string {
  const salt = bcrypt.genSaltSync(10);   
  return bcrypt.hashSync(password, salt);
}

export function compare(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}