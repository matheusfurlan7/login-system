import { IUserDto } from "../Dto/IUserDto";
import { ICreateUserDto } from "../Dto/ICreateUserDto";
import { IUpdateUserDto } from "../Dto/IUpdateUserDto";

interface IUserRepository {
  getUserName(id: number, userName: string): Promise<IUserDto | null>;
  getEmail(id: number, email: string): Promise<IUserDto | null>;
  getID(id: number): Promise<IUserDto | null>;
  getAll(): Promise<IUserDto[]>;
  create(user: ICreateUserDto): Promise<IUserDto>;
  update(user: IUpdateUserDto): Promise<IUserDto>;
}

export { IUserRepository };