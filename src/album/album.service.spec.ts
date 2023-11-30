import { Test, TestingModule } from '@nestjs/testing';
import {Repository} from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { AlbumEntity } from './album.entity';
import { AlbumService } from './album.service';
import { faker } from '@faker-js/faker';


describe('AlbumService', () => {
  let service: AlbumService;
  let repository: Repository<AlbumEntity>;
  let albumlist: AlbumEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AlbumService],
    }).compile();

    service = module.get<AlbumService>(AlbumService);
    repository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
    await seedDatabase();
  });


  const seedDatabase = async () => {
    repository.clear();
    albumlist = [];
    for(let i = 0; i < 5; i++){
        const album: AlbumEntity = await repository.save({
            fechaInicio: faker.date.past(),
            fechaFin: faker.date.future(),
            titulo: faker.lorem.word()})
        albumlist.push(album);
    }
  }
 
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should return a new album', async () => {
    const album: AlbumEntity = {
      id: "",
      fechaInicio: faker.date.past(),
      fechaFin: faker.date.future(),
      titulo: faker.lorem.word(),
      fotos: []
    }
 
    const newAlbum: AlbumEntity = await service.createAlbum(album);
    expect(newAlbum).not.toBeNull();
 
    const storedAlbum: AlbumEntity = await repository.findOne({where: {id: newAlbum.id}})
    expect(storedAlbum).not.toBeNull();
  });

  it('delete should remove a album', async () => {
    const album: AlbumEntity = albumlist[0];
    await service.deleteAlbum(album.id);
     const deletedAlbum: AlbumEntity = await repository.findOne({ where: { id: album.id } })
    expect(deletedAlbum).toBeNull();
  });



});