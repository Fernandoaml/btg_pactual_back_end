import { v4 as uuidv4 } from 'uuid';

import IDocumentRepository from '@modules/documents/repositories/IDocumentRepository';
import ICreateDocumentsDTO from '@modules/documents/dtos/ICreateDocumentsDTO';
import DocumentsEntities from '@modules/documents/infra/typeorm/entities/Documents';

class DocumentRepository implements IDocumentRepository {
  private documentRepository: DocumentsEntities[] = [];

  public async create({
    userId,
    fullName,
    birthDate,
    CPF,
    RG,
  }: ICreateDocumentsDTO): Promise<DocumentsEntities> {
    const document = new DocumentsEntities();
    Object.assign(document, {
      id: uuidv4,
      userId,
      fullName,
      birthDate,
      CPF,
      RG,
    });
    this.documentRepository.push(document);
    return document;
  }
}

export default DocumentRepository;
