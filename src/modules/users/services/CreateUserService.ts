import { injectable, inject } from 'tsyringe';
import { hash } from 'bcryptjs';

import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';
import AppError from '@shared/errors/AppErrors';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import User from '@modules/users/infra/typeorm/entities/User';

@injectable()
class CreateUserService {
  constructor(
    @inject('User')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    login,
    password,
    ip,
  }: ICreateUsersDTO): Promise<User> {
    const checkIfUserExists = await this.userRepository.findByLogin(login);

    if (checkIfUserExists) {
      throw new AppError('E-mail address already existis', 400);
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.userRepository.create({
      login,
      password: hashedPassword,
      ip,
    });
    delete user.password;
    return user;
  }
}

export default CreateUserService;
