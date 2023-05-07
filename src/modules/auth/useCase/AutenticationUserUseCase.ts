import { sign } from 'jsonwebtoken';

import { IAutenticationDto } from "../Dto/IAutenticationDto";
import { IAutenticationResponseDto } from "../Dto/IAutenticationResponseDto";

import UserRepository from "../../users/Repository";

import { AppError } from "../../../shared/exception/AppError";
import { compare } from '../../../shared/bcrypt';

class AutenticationUserUseCase {
  async execute({ userName, password }: IAutenticationDto): Promise<IAutenticationResponseDto> {
    if (userName.length <= 0)
      throw new AppError(404, "The userName wasn't informed.");

    if (password.length <= 0)
      throw new AppError(404, "The password wasn't informed.");

    const repository = new UserRepository();
    const user = await repository.getUserName(0, userName);

    if ((!user) || (compare(user.password, password)))
      throw new AppError(404, "User or password incorrect.");

    if (!process.env.JWT_SECRET)
      throw new AppError(505, "Secret to generate token wasn't informed.");

    const token = sign({}, process.env.JWT_SECRET, {
      subject: user.id!.toString(),
      expiresIn: process.env.JWT_EXPIRESIN!
    });

    return {
      user: {
        id: user.id!,
        name: user.name,
        email: user.email,
        birthDate: user.birthDate
      },
      token: token
    }
  }
}

export default AutenticationUserUseCase;