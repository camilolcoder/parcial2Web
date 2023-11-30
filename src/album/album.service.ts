import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { AlbumEntity } from 'src/album/album.entity';
import { FotoEntity } from '../foto/foto.entity';


@Injectable()
export class albumService {
    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>,

        @InjectRepository(FotoEntity)
        private readonly fotoRepository: Repository<FotoEntity>
    ){}

    async findAll(): Promise<AlbumEntity[]> {
        return await this.albumRepository.find({ relations: ["products", "comments"] });
    }

    async findAlbumById(id: string): Promise<AlbumEntity> {
        const album: AlbumEntity = await this.albumRepository.findOne({where: {id}, relations: ["fotos"] } );
        if (!album)
          throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);
    
        return album;
    }

    async create(album: AlbumEntity): Promise<AlbumEntity> {
        return await this.albumRepository.save(album);
    }

    async addFotoToAlbum(albumId: string, fotoId: string): Promise<AlbumEntity> {
        const foto: FotoEntity = await this.fotoRepository.findOne({where: {id: fotoId}});
        if (!foto)
          throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND);
       
        const album: AlbumEntity = await this.albumRepository.findOne({where: {id: albumId}, relations: ["fotos"]}) 
        if (!album)
          throw new BusinessLogicException("The user with the given id was not found", BusinessError.NOT_FOUND);

        if (foto.fecha <= album.fechaInicio)
            throw new BusinessLogicException("Fecha menor a la del album", BusinessError.BAD_REQUEST)

        if (foto.fecha >= album.fechaFin)
        throw new BusinessLogicException("Fecha menor a la del album", BusinessError.BAD_REQUEST)
     
        album.fotos = [...album.fotos, foto];
        return await this.albumRepository.save(foto);
      }

    async delete(id: string) {
        const album: AlbumEntity = await this.albumRepository.findOne({where:{id}});
        if (!album)
          throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);
      
        await this.albumRepository.remove(album);
    }
}