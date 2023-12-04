import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { FotoDTO } from './foto.dto';
import { FotoEntity } from './foto.entity';
import { FotoService } from './foto.service';

@Controller('fotos')
@UseInterceptors(BusinessErrorsInterceptor)
export class FotoController {
    constructor(private readonly fotoService: FotoService) {}

  @Get()
  async findAll() {
    return await this.fotoService.findAllFotos();
  }

  @Get(':fotoId')
  async findOne(@Param('fotoId') fotoId: string) {
    return await this.fotoService.findFotoById(fotoId);
  }

  @Post()
  async create(@Body() fotoDto: FotoDTO) {
    const foto: FotoEntity = plainToInstance(FotoEntity, fotoDto);
    return await this.fotoService.createFoto(foto);
  }

  @Put(':fotoId')
  async update(@Param('fotoId') fotoId: string, @Body() fotoDto: FotoDTO) {
    const foto: FotoEntity = plainToInstance(FotoEntity, fotoDto);
    return await this.fotoService.updateFoto(fotoId, foto);
  }

  @Delete(':fotoId')
  @HttpCode(204)
  async delete(@Param('fotoId') fotoId: string) {
    return await this.fotoService.deleteFoto(fotoId);
  }

}