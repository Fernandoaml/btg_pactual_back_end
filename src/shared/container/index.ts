import { container } from 'tsyringe';

import '@modules/users/providers';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

import IDocumentRepository from '@modules/documents/repositories/IDocumentRepository';
import DocumentRepository from '@modules/documents/infra/typeorm/repositories/DocumentRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IDocumentRepository>(
  'DocumentRepository',
  DocumentRepository,
);
