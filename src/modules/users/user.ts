import IUser from "./user.interface";
import IUserTable from "./user.table.interface";
import UserTable from './user.table';

class User implements IUser {
  private table: IUserTable = new UserTable();

  public id?: number;
  public createdAt?: Date;
  public updatedAt?: Date;
  public name: string = '';
  public birthDate: Date = new Date('1899-12-31');
  public email: string = '';
  public userName: string = '';
  public password: string = '';

  private feed(user: IUser) {
    this.id = user.id;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.name = user.name;
    this.birthDate = user.birthDate;
    this.email = user.email;
    this.userName = user.userName;
    this.password = user.password;
  }

  public async get(id: number) {
    const userLoad = await this.table.load(id);

    if (!!!userLoad) { 
      throw new Error(`Not found user with id "${id}"`);
    }

    this.feed(userLoad);
  }

  public async create(user: IUser) {
    const userUserName = await this.table.getUserName(user.userName);
    if (!!!userUserName) { 
      throw new Error(`UserName "${user.userName}" is in use.`);
    }
    
    const userEmail = await this.table.getEmail(user.email);
    if (!!!userEmail) { 
      throw new Error(`Email "${user.email}" is in use.`);
    }

    const userInsert = await this.table.create({
      name: user.name,
      birthDate: user.birthDate,
      email: user.email,
      userName: user.userName,
      password: user.password      
    })

    this.feed(userInsert);
  }

  public async update(user: IUser) {
    this.get(Number(user.id));

    const userUpdate = await this.table.update({
      id: this.id,
      name: user.name,
      birthDate: user.birthDate,
      email: user.email,
      userName: user.userName,
      password: user.password
    });

    this.feed(userUpdate);
  }

  public getAll(): Promise<IUser[]> {
    return this.table.getAll();
  }
};

export default User;