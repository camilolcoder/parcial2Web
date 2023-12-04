import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { FotoEntity } from '../foto/foto.entity';


@Injectable()
export class FotoService {
    constructor(
        @InjectRepository(FotoEntity)
        private readonly fotoRepository: Repository<FotoEntity>
    ){}

    async findAllFotos(): Promise<FotoEntity[]> {
        return await this.fotoRepository.find();
    }

    async findFotoById(id: string): Promise<FotoEntity> {
        const foto: FotoEntity = await this.fotoRepository.findOne({where: {id} } );
        if (!foto)
          throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND);
    
        return foto;
    }
    
    async createFoto(foto: FotoEntity): Promise<FotoEntity> {

        if (foto.ISO < 100 || foto.ISO > 6400)
            throw new BusinessLogicException("foto debe estar entre 100 y 6400", BusinessError.BAD_REQUEST)

        if (foto.velObturacion < 2 || foto.velObturacion > 250)
            throw new BusinessLogicException("foto debe estar entre 100 y 6400", BusinessError.BAD_REQUEST)

        
        if (foto.apertura < 1 || foto.apertura > 32)
            throw new BusinessLogicException("foto debe estar entre 100 y 6400", BusinessError.BAD_REQUEST)

        const arribaMedia = [foto.ISO, foto.velObturacion, foto.apertura].filter(value => value > this.calculoMedia(value)).length;

        if (arribaMedia > 2) {
            throw new BusinessLogicException("maximo 2 de los atributos(ISO, velO, apertura) deben estar por encima de la media", BusinessError.BAD_REQUEST)
        }

        return await this.fotoRepository.save(foto);
    }

    async updateFoto(id: string, foto: FotoEntity): Promise<FotoEntity> {
        const persistedfoto: FotoEntity = await this.fotoRepository.findOne({where:{id}});
        if (!persistedfoto)
          throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND);
        
        return await this.fotoRepository.save({...persistedfoto, ...foto});
    }

    async deleteFoto(id: string) {
        const foto: FotoEntity = await this.fotoRepository.findOne({where:{id}});
        if (!foto)
          throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND);
      
        await this.fotoRepository.remove(foto);
    }

    private calculoMedia(...values: number[]): number {
        const sum = values.reduce((acc, val) => acc + val, 0);
        return sum / values.length;
      }
}