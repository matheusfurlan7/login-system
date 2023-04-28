import User from "./user.interface";
import { PrismaClient } from '@prisma/client'

class UserTable {
  private prisma: PrismaClient = new PrismaClient();

  public getAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}

export default UserTable;