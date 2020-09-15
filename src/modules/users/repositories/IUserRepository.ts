import UserRepository from '@modules/users/infra/typeorm/entities/User';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';

export default interface ICreateUsers {
  create(data: ICreateUsersDTO): Promise<UserRepository>;
  findByLogin(login: string): Promise<UserRepository | undefined>;
}
