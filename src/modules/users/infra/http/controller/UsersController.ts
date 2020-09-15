import { Request, Response } from 'express';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    return response.json({ ok: 'OK' });
  }
}
