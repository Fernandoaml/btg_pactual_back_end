import { getRepository, Repository } from 'typeorm';

import IDocumentRepository from '@modules/documents/repositories/IDocumentRepository';
import ICreateDocumentsDTO from '@modules/documents/dtos/ICreateDocumentsDTO';
import DocumentsEntities from '@modules/documents/infra/typeorm/entities/Documents';

class DocumentRepository implements IDocumentRepository {
  private repository: Repository<DocumentsEntities>;

  constructor() {
    this.repository = getRepository(DocumentsEntities);
  }

  public async create({
    userId,
    fullName,
    birthDate,
    CPF,
    RG,
  }: ICreateDocumentsDTO): Promise<DocumentsEntities> {
    const document = this.repository.create({
      userId,
      fullName,
      birthDate,
      CPF,
      RG,
    });
    await this.repository.save(document);
    return document;
  }
}

export default DocumentRepository;
