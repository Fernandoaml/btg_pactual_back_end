import { getRepository, Repository } from 'typeorm';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';
import UserEntities from '@modules/users/infra/typeorm/entities/User';

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
}

export default UserRepository;
