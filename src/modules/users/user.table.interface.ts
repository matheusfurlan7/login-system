import IUser from "./user.interface";

interface IUserTable {

  load(id: number): Promise<IUser | null>;
  create(user: IUser): Promise<IUser>;
  update(user: IUser): Promise<IUser>;
  getAll(): Promise<IUser[]>;

  getUserName(userName: string): Promise<IUser | null>;
  getEmail(email: string): Promise<IUser | null>;
}

export default IUserTable;