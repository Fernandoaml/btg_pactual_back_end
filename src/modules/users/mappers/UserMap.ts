import User from '@modules/users/infra/typeorm/entities/User';

export default class UserMap {
  public static toDTO(user: User) {
    return {
      id: user.id,
      login: user.login,
      ip: user.ip,
    };
  }
}
