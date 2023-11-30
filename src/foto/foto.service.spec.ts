import { Test, TestingModule } from '@nestjs/testing';
import {Repository} from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { FotoEntity } from './foto.entity';
import { FotoService } from './foto.service';
import { faker } from '@faker-js/faker';


describe('FotoService', () => {
  let service: FotoService;
  let repository: Repository<FotoEntity>;
  let fotolist: FotoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [FotoService],
    }).compile();

    service = module.get<FotoService>(FotoService);
    repository = module.get<Repository<FotoEntity>>(getRepositoryToken(FotoEntity));
    await seedDatabase();
  });


  const seedDatabase = async () => {
    repository.clear();
    fotolist = [];
    for(let i = 0; i < 5; i++){
        const foto: FotoEntity = await repository.save({
            ISO: faker.number.int(),
            velObturacion: faker.number.int(),
            apertura: faker.number.int(),
            fecha: faker.date.past()})
        fotolist.push(foto);
    }
  }
 
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

//   it('creates a new foto', async () => {
//     const foto: FotoEntity = {
//       id: "",
//       ISO: faker.number.int(),
//       velObturacion: faker.number.int(),
//       apertura: faker.number.int(),
//       fecha: faker.date.past(),
//       usuario: null,
//       album: null
//     }
 
//     const newfoto: FotoEntity = await service.createFoto(foto);
//     expect(newfoto).not.toBeNull();
 
//     const storedfoto: FotoEntity = await repository.findOne({where: {id: newfoto.id}})
//     expect(storedfoto).not.toBeNull();
//   });

  it('create Foto', async () => {
    const foto: FotoEntity = {
      id: "",
      ISO: 150,
      velObturacion: 150,
      apertura: 30,
      fecha: faker.date.past(),
      usuario: null,
      album: null
    }
 
    const newfoto: FotoEntity = await service.createFoto(foto);
    expect(newfoto).not.toBeNull();
 
    const storedfoto: FotoEntity = await repository.findOne({where: {id: newfoto.id}})
    expect(storedfoto).not.toBeNull();
  });

  it('delete should remove a foto', async () => {
    const foto: FotoEntity = fotolist[0];
    await service.deleteFoto(foto.id);
     const deletedfoto: FotoEntity = await repository.findOne({ where: { id: foto.id } })
    expect(deletedfoto).toBeNull();
  });

});