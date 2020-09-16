import { injectable, inject } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUserRepository';

interface IUpdateUser {
  login: string;
  ip: string;
}

@injectable()
class UpdateUserIp {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ login, ip }: IUpdateUser): Promise<void> {
    await this.userRepository.updateIp({ login, ip });
  }
}

export default UpdateUserIp;
