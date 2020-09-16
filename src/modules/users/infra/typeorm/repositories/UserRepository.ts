import { getRepository, Repository } from 'typeorm';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';
import UserEntities from '@modules/users/infra/typeorm/entities/User';

interface IUpdateUser {
  login: string;
  ip: string;
}

class UserRepository implements IUserRepository {
  private repository: Repository<UserEntities>;

  constructor() {
    this.repository = getRepository(UserEntities);
  }

  public async findByLogin(login: string): Promise<UserEntities | undefined> {
    const user = await this.repository.findOne({ where: { login } });
    return user;
  }

  public async create({
    login,
    password,
    ip,
  }: ICreateUsersDTO): Promise<UserEntities> {
    const user = this.repository.create({
      login,
      password,
      ip,
    });
    await this.repository.save(user);
    return user;
  }

  public async updateIp({ login, ip }: IUpdateUser): Promise<void> {
    this.repository.update({ login }, { ip });
  }
}

export default UserRepository;
