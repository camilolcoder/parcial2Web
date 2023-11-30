import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedSocialModule } from './red-social/red-social.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AlbumModule } from './album/album.module';
import { FotoModule } from './foto/foto.module';
import { UsuarioEntity } from './usuario/usuario.entity';
import { RedSocialEntity } from './red-social/red-social.entity';
import { FotoEntity } from './foto/foto.entity';
import { AlbumEntity } from './album/album.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: "postgres",
      password: "camilol47",
      database: "postgres",
      entities: [UsuarioEntity, RedSocialEntity, FotoEntity, AlbumEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }),
    RedSocialModule,
    UsuarioModule,
    AlbumModule,
    FotoModule,
  ],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}