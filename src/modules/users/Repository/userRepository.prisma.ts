import { PrismaClient } from '@prisma/client'
import { IUserDto } from '../Dto/IUserDto';
import { ICreateUserDto } from '../Dto/ICreateUserDto';
import { IUpdateUserDto } from '../Dto/IUpdateUserDto';
import { IUserRepository } from './IUserRepository';

class UserRepositoryPrisma implements IUserRepository {
  private prisma: PrismaClient = new PrismaClient();

  public getAll(): Promise<IUserDto[]> {
    return this.prisma.user.findMany();
  }

  public getID(id: number): Promise<IUserDto | null> {
    return this.prisma.user.findUnique({
      where: { id: id },
    });
  };

  public getUserName(id: number, userName: string): Promise<IUserDto | null> {
    return this.prisma.user.findFirst({
      where: {
        userName: { equals: userName },
        id: { not: id }
      },
    });
  };

  public getEmail(id: number, email: string): Promise<IUserDto | null> {
    return this.prisma.user.findFirst({
      where: {
        email: { equals: email },
        id: { not: id }
      },
    });
  };

  public create(user: ICreateUserDto): Promise<IUserDto> {
    return this.prisma.user.create({
      data: {
        name: user.name,
        birthDate: user.birthDate,
        email: user.email,
        userName: user.userName,
        password: user.password
      }
    });
  }

  public update(user: IUpdateUserDto): Promise<IUserDto> {
    return this.prisma.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        birthDate: user.birthDate,
        email: user.email
      }
    });
  }
}

export default UserRepositoryPrisma;