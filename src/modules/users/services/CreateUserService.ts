import { injectable, inject } from 'tsyringe';

import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';
import AppError from '@shared/errors/AppErrors';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import User from '@modules/users/infra/typeorm/entities/User';

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    login,
    password,
    ip,
  }: ICreateUsersDTO): Promise<User> {
    const checkIfUserExists = await this.userRepository.findByLogin(login);

    if (checkIfUserExists) {
      throw new AppError('Login address already existis', 400);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      login,
      password: hashedPassword,
      ip,
    });
    return user;
  }
}

export default CreateUserService;
