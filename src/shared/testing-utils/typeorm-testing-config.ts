import {TypeOrmModule} from '@nestjs/typeorm';
import { UsuarioEntity } from '../../usuario/usuario.entity';
import { RedSocialEntity } from '../../red-social/red-social.entity';
import { FotoEntity } from '../../foto/foto.entity';
import { AlbumEntity } from '../../album/album.entity';

export const TypeOrmTestingConfig = () => [
    TypeOrmModule.forRoot({
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        entities: [UsuarioEntity, RedSocialEntity, FotoEntity, AlbumEntity],
        synchronize: true,
        keepConnectionAlive: true,
    }),
    TypeOrmModule.forFeature([UsuarioEntity, RedSocialEntity, FotoEntity, AlbumEntity]),
];