interface IAutenticationResponseUserDto {
  id: number;
  name: string;
  email: string;
  birthDate: Date;
};

interface IAutenticationResponseDto {
  user: IAutenticationResponseUserDto;
  token: string;
};

export { IAutenticationResponseDto };