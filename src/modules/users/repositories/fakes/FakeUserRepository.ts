import { v4 as uuidv4 } from 'uuid';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';
import UserEntities from '@modules/users/infra/typeorm/entities/User';

interface IUpdateUser {
  login: string;
  ip: string;
}

class UserRepository implements IUserRepository {
  private usersRepository: UserEntities[] = [];

  public async findByLogin(login: string): Promise<UserEntities | undefined> {
    const findUser = this.usersRepository.find(user => user.login === login);
    return findUser;
  }

  public async create({
    login,
    password,
    ip,
  }: ICreateUsersDTO): Promise<UserEntities> {
    const user = new UserEntities();
    Object.assign(user, {
      id: uuidv4(),
      login,
      password,
      ip,
    });
    this.usersRepository.push(user);
    return user;
  }

  public async updateIp({ login, ip }: IUpdateUser): Promise<void> {
    this.usersRepository.find(user => {
      if (user.login === login) {
        // eslint-disable-next-line no-param-reassign
        user.ip = ip;
      }
    });
  }
}

export default UserRepository;
