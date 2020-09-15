import UserEntitie from '@modules/users/infra/typeorm/entities/User';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';

interface IUpdateUser {
  login: string;
  ip: string;
}

export default interface ICreateUsers {
  create(data: ICreateUsersDTO): Promise<UserEntitie>;
  findByLogin(login: string): Promise<UserEntitie | undefined>;
  updateIp({ login, ip }: IUpdateUser): Promise<void>;
}
