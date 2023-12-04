import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { AlbumDTO } from './album.dto';
import { AlbumEntity } from './album.entity';
import { AlbumService } from './album.service';

@Controller('albums')
@UseInterceptors(BusinessErrorsInterceptor)
export class AlbumController {
    constructor(private readonly albumService: AlbumService) {}

  @Get()
  async findAll() {
    return await this.albumService.findAllAlbums();
  }

  @Get(':albumId')
  async findOne(@Param('albumId') albumId: string) {
    return await this.albumService.findAlbumById(albumId);
  }

  @Post()
  async create(@Body() albumDto: AlbumDTO) {
    const album: AlbumEntity = plainToInstance(AlbumEntity, albumDto);
    return await this.albumService.createAlbum(album);
  }

  @Post(':albumId/fotos/fotoId')
  async update(@Param('albumId') albumId: string, @Param('fotoId') fotoId: string) {
    return await this.albumService.addFotoToAlbum(albumId, fotoId);
  }

  @Delete(':albumId')
  @HttpCode(204)
  async delete(@Param('albumId') albumId: string) {
    return await this.albumService.deleteAlbum(albumId);
  }

}