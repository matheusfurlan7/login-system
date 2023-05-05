import { IUserDto } from "../Dto/IUserDto";
import { IUserRepository } from "../Repository/IUserRepository";
import UserRepository from "../Repository";

import { AppError } from "../../../shared/exception/AppError";

class GetIdUserUseCase {
  async execute(id: number): Promise<IUserDto> {
    const repository: IUserRepository = new UserRepository();
    const record = await repository.getID(id);

    if (!record) 
      throw new AppError(404, "No users found.");
      
    return record;
  }
}

export default GetIdUserUseCase;