import DocumentEntitie from '@modules/documents/infra/typeorm/entities/Documents';
import ICreateDocumentDTO from '@modules/documents/dtos/ICreateDocumentsDTO';

export default interface ICreateDocuments {
  create(data: ICreateDocumentDTO): Promise<DocumentEntitie>;
}
