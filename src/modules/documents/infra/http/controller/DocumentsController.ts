import { injectable, inject, container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import path from 'path';

import CreateDocumentService from '@modules/documents/services/CreateDocumentService';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import { globalLogin } from '@modules/users/infra/http/controller/SessionController';
import AppError from '@shared/errors/AppErrors';

@injectable()
export default class DocumentsController {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async create(request: Request, response: Response): Promise<Response> {
    const tmpFolder = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      '..',
      '..',
      'tmp',
    );
    const { id } = request.user;
    const { ip } = request.userIP;

    const { fullName, birthDate, CPF, RG } = request.body;

    const archiveTextBody =
      `Nome Completo: ${fullName} \n` +
      `Data de Nascimento: ${birthDate} \n` +
      `CPF: ${CPF}  | RG: ${RG} \n\n` +
      `Usuário Logado: ${globalLogin} | IP: ${ip}\n` +
      `Id do usuário no Sistema: ${id}`;
    process.chdir(tmpFolder);

    fs.writeFile(`Documento-${uuidv4()}`, archiveTextBody, error => {
      if (error) throw new AppError('Failed to write a file on tmp folder.');
    });
    const createDocument = container.resolve(CreateDocumentService);
    const document = await createDocument.execute({
      userId: request.user.id,
      fullName,
      birthDate,
      RG,
      CPF,
    });

    return response.json(classToClass(document));
  }
}
