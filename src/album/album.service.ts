import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { AlbumEntity } from '../album/album.entity';
import { FotoEntity } from '../foto/foto.entity';


@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>,

        @InjectRepository(FotoEntity)
        private readonly fotoRepository: Repository<FotoEntity>
    ){}

    async findAllAlbums(): Promise<AlbumEntity[]> {
        return await this.albumRepository.find({ relations: ["fotos"] });
    }

    async findAlbumById(id: string): Promise<AlbumEntity> {
        const album: AlbumEntity = await this.albumRepository.findOne({where: {id}, relations: ["fotos"] } );
        if (!album)
          throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);
    
        return album;
    }

    async createAlbum(album: AlbumEntity): Promise<AlbumEntity> {
        return await this.albumRepository.save(album);
    }

    async addFotoToAlbum(albumId: string, fotoId: string): Promise<AlbumEntity> {
        const foto: FotoEntity = await this.fotoRepository.findOne({where: {id: fotoId}});
        if (!foto)
          throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND);
       
        const album: AlbumEntity = await this.albumRepository.findOne({where: {id: albumId}, relations: ["fotos"]}) 
        if (!album)
          throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);

        if (foto.fecha <= album.fechaInicio)
            throw new BusinessLogicException("Fecha menor a la del album", BusinessError.BAD_REQUEST)

        if (foto.fecha >= album.fechaFin)
          throw new BusinessLogicException("Fecha mayor a la del album", BusinessError.BAD_REQUEST)

        if (album.fotos.length >= 5)
          throw new BusinessLogicException("Maximo un album puede tener 5 fotos", BusinessError.BAD_REQUEST)

        album.fotos = [...album.fotos, foto];
        return await this.albumRepository.save(foto);
      }

    async deleteAlbum(id: string) {
        const album: AlbumEntity = await this.albumRepository.findOne({where:{id}, relations: ["fotos"]});
        if (!album)
          throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);

        if (album.fotos.length > 0)
          throw new BusinessLogicException("El album tiene una foto asignada por lo tanto no se puede elimianr", BusinessError.BAD_REQUEST)

        await this.albumRepository.remove(album);
    }
}