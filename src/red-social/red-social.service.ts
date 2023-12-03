import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { RedSocialEntity } from '../red-social/red-social.entity';


@Injectable()
export class RedSocialService {
    constructor(
        @InjectRepository(RedSocialEntity)
        private readonly redSocialRepository: Repository<RedSocialEntity>
    ){}

    async findAllRedeSocial(): Promise<RedSocialEntity[]> {
        return await this.redSocialRepository.find({ relations: ["redSocials"] });
    }

    async findRedSocialById(id: string): Promise<RedSocialEntity> {
        const redSocial: RedSocialEntity = await this.redSocialRepository.findOne({where: {id}, relations: ["redSocials"] } );
        if (!redSocial)
          throw new BusinessLogicException("The redSocial with the given id was not found", BusinessError.NOT_FOUND);
    
        return redSocial;
    }
    
    async createRedSocial(redSocial: RedSocialEntity): Promise<RedSocialEntity> {

        if (!redSocial.slogan)
            throw new BusinessLogicException("redSocial debe tener slogan", BusinessError.BAD_REQUEST)
        
        if (redSocial.slogan.length >= 20)
            throw new BusinessLogicException("redSocial debe tener slogan", BusinessError.BAD_REQUEST)
        
        return await this.redSocialRepository.save(redSocial);
    }

    async updateRedSocial(id: string, redSocial: RedSocialEntity): Promise<RedSocialEntity> {
        const persistedredSocial: RedSocialEntity = await this.redSocialRepository.findOne({where:{id}});
        if (!persistedredSocial)
          throw new BusinessLogicException("The redSocial with the given id was not found", BusinessError.NOT_FOUND);
        
        return await this.redSocialRepository.save({...persistedredSocial, ...redSocial});
    }

    async deleteRedSocial(id: string) {
        const redSocial: RedSocialEntity = await this.redSocialRepository.findOne({where:{id}});
        if (!redSocial)
          throw new BusinessLogicException("The redSocial with the given id was not found", BusinessError.NOT_FOUND);
      
        await this.redSocialRepository.remove(redSocial);
    }
}