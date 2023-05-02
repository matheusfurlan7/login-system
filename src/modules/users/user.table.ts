import IUser from "./user.interface";
import IUserTable from "./user.table.interface";

import { PrismaClient } from '@prisma/client'

class UserTable implements IUserTable {
  private prisma: PrismaClient = new PrismaClient();

  public getAll(): Promise<IUser[]> {
    return this.prisma.user.findMany();
  }

  public load(id: number): Promise<IUser | null> {
    return this.prisma.user.findUnique({
      where: { id: id },
    });
  };

  public getUserName(userName: string): Promise<IUser | null> {
    return this.prisma.user.findFirst({
      where: { userName: userName },
    });
  };

  public getEmail(email: string): Promise<IUser | null> {
    return this.prisma.user.findFirst({
      where: { email: email },
    });
  };

  public create(user: IUser): Promise<IUser> {
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

  public update(user: IUser): Promise<IUser> {
    return this.prisma.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        birthDate: user.birthDate,
        email: user.email,
        userName: user.userName,
        password: user.password
      }
    });
  }
}

export default UserTable;