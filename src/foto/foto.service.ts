import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { FotoEntity } from 'src/foto/foto.entity';


@Injectable()
export class fotoService {
    constructor(
        @InjectRepository(FotoEntity)
        private readonly fotoRepository: Repository<FotoEntity>
    ){}

    async findAll(): Promise<FotoEntity[]> {
        return await this.fotoRepository.find({ relations: ["fotos"] });
    }

    async findOne(id: string): Promise<FotoEntity> {
        const foto: FotoEntity = await this.fotoRepository.findOne({where: {id}, relations: ["fotos"] } );
        if (!foto)
          throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND);
    
        return foto;
    }
    
    async create(foto: FotoEntity): Promise<FotoEntity> {

        if (foto.ISO < 100 || foto.ISO > 6400)
            throw new BusinessLogicException("foto debe estar entre 100 y 6400", BusinessError.BAD_REQUEST)

        if (foto.velObturacion < 2 || foto.velObturacion > 250)
            throw new BusinessLogicException("foto debe estar entre 100 y 6400", BusinessError.BAD_REQUEST)

        
        if (foto.velObturacion < 1 || foto.velObturacion > 32)
            throw new BusinessLogicException("foto debe estar entre 100 y 6400", BusinessError.BAD_REQUEST)

        return await this.fotoRepository.save(foto);
    }

    async update(id: string, foto: FotoEntity): Promise<FotoEntity> {
        const persistedfoto: FotoEntity = await this.fotoRepository.findOne({where:{id}});
        if (!persistedfoto)
          throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND);
        
        return await this.fotoRepository.save({...persistedfoto, ...foto});
    }

    async delete(id: string) {
        const foto: FotoEntity = await this.fotoRepository.findOne({where:{id}});
        if (!foto)
          throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND);
      
        await this.fotoRepository.remove(foto);
    }
}