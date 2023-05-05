interface IUserDto {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  name: string;
  birthDate: Date;
  email: string;
  userName: string;
  password: string;
}

export { IUserDto };