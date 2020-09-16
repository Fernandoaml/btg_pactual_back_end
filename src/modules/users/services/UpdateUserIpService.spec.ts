import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';
import UpdateUserIpService from './UpdateUserIpService';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let authenticateUser: AuthenticateUserService;
let updateUserIpService: UpdateUserIpService;

describe('UpdateUserIP', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    updateUserIpService = new UpdateUserIpService(fakeUsersRepository);
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to create User, update then and update user IP with they session IP', async () => {
    const user = await createUserService.execute({
      login: 'JhonDoe',
      password: '123456',
      ip: '127.0.0.1',
    });

    const response = await authenticateUser.execute({
      login: 'JhonDoe',
      password: '123456',
    });

    await updateUserIpService.execute({
      login: 'JhonDoe',
      ip: '192.168.0.249',
    });
    const updatedData = await fakeUsersRepository.findByLogin('JhonDoe');
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
    expect(updatedData?.ip).toEqual('192.168.0.249');
  });
});
