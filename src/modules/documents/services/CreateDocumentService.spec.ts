import FakeDocumentRepository from '../repositories/fakes/FakeDocumentRepository';
import CreateDocumentService from './CreateDocumentService';

let fakeDocumentRepository: FakeDocumentRepository;
let createDocumentService: CreateDocumentService;

describe('Create Document', () => {
  beforeEach(() => {
    fakeDocumentRepository = new FakeDocumentRepository();
    createDocumentService = new CreateDocumentService(fakeDocumentRepository);
  });
  it('should be able to create a new Document', async () => {
    const document = await createDocumentService.execute({
      userId: 'USER ID FROM TEST',
      birthDate: '22/12/1989',
      fullName: 'Fernando Leite',
      CPF: '11111111111',
      RG: '088888888',
    });
    expect(document).toHaveProperty('id');
    expect(document.userId).toEqual('USER ID FROM TEST');
  });
});
