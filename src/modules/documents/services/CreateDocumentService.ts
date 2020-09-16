import { injectable, inject } from 'tsyringe';

import ICreateDocumentsDTO from '@modules/documents/dtos/ICreateDocumentsDTO';
import IDocumentRepository from '@modules/documents/repositories/IDocumentRepository';
import DocumentsEntities from '@modules/documents/infra/typeorm/entities/Documents';

@injectable()
class CreateDocumentService {
  constructor(
    @inject('DocumentRepository')
    private documentRepository: IDocumentRepository,
  ) {}

  public async execute({
    userId,
    fullName,
    birthDate,
    CPF,
    RG,
  }: ICreateDocumentsDTO): Promise<DocumentsEntities> {
    const document = await this.documentRepository.create({
      userId,
      fullName,
      birthDate,
      CPF,
      RG,
    });
    return document;
  }
}

export default CreateDocumentService;
