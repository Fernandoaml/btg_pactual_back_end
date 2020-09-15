import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UpdateUserIpService from '@modules/users/services/UpdateUserIpService';

export default class AuthenticationController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { ip } = request.userIP;
    const { login, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);
    const updateUserIp = container.resolve(UpdateUserIpService);

    const [{ user, token }] = await Promise.all([
      authenticateUser.execute({
        login,
        password,
      }),
      updateUserIp.execute({
        login,
        ip,
      }),
    ]);

    delete user.password;
    return response.json({ user: classToClass(user), token });
  }
}
