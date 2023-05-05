import { IUserDto } from "../Dto/IUserDto";
import { IUserRepository } from "../Repository/IUserRepository";
import UserRepository from "../Repository";

class GetAllUserUseCase {
  async execute(): Promise<IUserDto[]> {
    const repository: IUserRepository = new UserRepository();
    return await repository.getAll();
  }
}

export default GetAllUserUseCase;