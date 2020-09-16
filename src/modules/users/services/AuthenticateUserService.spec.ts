import AppError from '@shared/errors/AppErrors';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to authenticate', async () => {
    const user = await createUserService.execute({
      login: 'JhonDoe',
      password: '123456',
      ip: '127.0.0.1',
    });

    const response = await authenticateUser.execute({
      login: 'JhonDoe',
      password: '123456',
    });
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
  it('should not be able to authenticate a non existing user', async () => {
    await expect(
      authenticateUser.execute({
        login: 'JhonDoe',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to authenticate with wrong password', async () => {
    await createUserService.execute({
      login: 'JhonDoe',
      password: '123456',
      ip: '127.0.0.1',
    });

    await expect(
      authenticateUser.execute({
        login: 'JhonDoe',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
