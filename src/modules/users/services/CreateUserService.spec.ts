import AppError from '@shared/errors/AppErrors';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUserRepository;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to create a new User', async () => {
    const user = await createUser.execute({
      login: 'John Doe',
      password: '123456',
      ip: '127.0.0.1',
    });
    expect(user).toHaveProperty('id');
  });
  it('should not be able to create a new User with duplicated email', async () => {
    await createUser.execute({
      login: 'John Doe',
      password: '123456',
      ip: '127.0.0.1',
    });

    await expect(
      createUser.execute({
        login: 'John Doe',
        password: '123456',
        ip: '127.0.0.1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
