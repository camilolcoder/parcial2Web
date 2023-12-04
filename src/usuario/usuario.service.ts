import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';


@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>
    ){}

    async findAllUsuarios(): Promise<UsuarioEntity[]> {
        return await this.usuarioRepository.find({ relations: ["fotos"] });
    }

    async findUsuarioById(id: string): Promise<UsuarioEntity> {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id}, relations: ["fotos"] } );
        if (!usuario)
          throw new BusinessLogicException("The usuario with the given id was not found", BusinessError.NOT_FOUND);
    
        return usuario;
    }
    
    async createUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity> {
        if (usuario.telefono.length == 10)
            throw new BusinessLogicException("The usuario telefono needs to have 10 characters", BusinessError.NOT_FOUND);
        return await this.usuarioRepository.save(usuario);
    }

    async updateUsuario(id: string, usuario: UsuarioEntity): Promise<UsuarioEntity> {
        const persistedusuario: UsuarioEntity = await this.usuarioRepository.findOne({where:{id}});
        if (!persistedusuario)
          throw new BusinessLogicException("The usuario with the given id was not found", BusinessError.NOT_FOUND);
        
        return await this.usuarioRepository.save({...persistedusuario, ...usuario});
    }

    async deleteUsuario(id: string) {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where:{id}});
        if (!usuario)
          throw new BusinessLogicException("The usuario with the given id was not found", BusinessError.NOT_FOUND);
      
        await this.usuarioRepository.remove(usuario);
    }
}