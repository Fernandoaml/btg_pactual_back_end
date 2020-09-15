import UserEntitie from '@modules/users/infra/typeorm/entities/User';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';

export default interface ICreateUsers {
  create(data: ICreateUsersDTO): Promise<UserEntitie>;
  findByLogin(login: string): Promise<UserEntitie | undefined>;
}
