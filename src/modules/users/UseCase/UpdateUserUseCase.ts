import { IUserDto } from "../Dto/IUserDto";
import { IUserRepository } from "../Repository/IUserRepository";
import { IUpdateUserDto } from "../Dto/IUpdateUserDto";

import UserRepository from "../Repository";

import { isValidDate } from "../../../shared/validetDate";
import { AppError } from "../../../shared/exception/AppError";

class UpdateUserUseCase {
  async execute({ id, name, birthDate, email }: IUpdateUserDto): Promise<IUserDto> {
    const repository: IUserRepository = new UserRepository();
    const user = await repository.getID(id);
    if (!user)
      throw new AppError(404, "No users found.");

    if (name.length <= 3)
      throw new AppError(404, "The name wasn't informed");

    if (!isValidDate(birthDate))
      throw new AppError(404, "Date of birth is missing or invalid.");

    if (!email) {
      email = user.email;
    } else {
      if (email.length <= 10)
        throw new AppError(404, "email must be more than 10 characters.");

      const usersEmail = await repository.getEmail(id, email);
      if (!!usersEmail)
        throw new AppError(404, `The e-mail "${email}" is being used`);
    }

    return await repository.update({ id, name, birthDate, email });
  }
}

export default UpdateUserUseCase;