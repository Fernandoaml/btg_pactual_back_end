import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateDocumentService from '@modules/documents/services/CreateDocumentService';

export default class DocumentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { fullName, birthDate, CPF, RG } = request.body;

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
