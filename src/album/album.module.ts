import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './album.entity';
import { AlbumController } from './album.controller';
import { FotoService } from '../foto/foto.service';
import { FotoEntity } from '../foto/foto.entity';

@Module({
    providers: [AlbumService, FotoService],
    imports: [TypeOrmModule.forFeature([AlbumEntity, FotoEntity])],
    controllers: [AlbumController],
})
export class AlbumModule {}
