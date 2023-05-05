import { IUserDto } from "../Dto/IUserDto";
import { IUserRepository } from "../Repository/IUserRepository";
import { ICreateUserDto } from "../Dto/ICreateUserDto";

import UserRepository from "../Repository";

import { AppError } from "../../../shared/exception/AppError";

import { isValidDate } from "../../../shared/function";

class CreateUserUseCase {
  async execute({ name, birthDate, email, userName, password }: ICreateUserDto): Promise<IUserDto> {
    if (name.length <= 3)
      throw new AppError(404, "The name wasn't informed");

    if (!isValidDate(birthDate))
      throw new AppError(404, "Date of birth is missing or invalid.");

    if (email.length <= 10)
      throw new AppError(404, "email must be more than 10 characters.");

    const repository: IUserRepository = new UserRepository();
    const usersEmail = await repository.getEmail(0, email);
    if (!!usersEmail)
      throw new AppError(404, `The e-mail "${email}" is being used`);

    if (userName.length <= 5)
      throw new AppError(404, "The e-mail wasn't informed");

    const usersUserName = await repository.getUserName(0, userName);
    if (!!usersUserName)
      throw new AppError(404, `The userName "${userName}" is being used`);

    return await repository.create({ name, birthDate, email, userName, password });
  }
}

export default CreateUserUseCase;