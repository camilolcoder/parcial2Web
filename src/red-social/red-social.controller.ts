import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { RedSocialDTO } from './red-social.dto';
import { RedSocialEntity } from './red-social.entity';
import { RedSocialService } from './red-social.service';

@Controller('redSocial')
@UseInterceptors(BusinessErrorsInterceptor)
export class redSocialController {
    constructor(private readonly redSocialService: RedSocialService) {}

  @Get()
  async findAll() {
    return await this.redSocialService.findAllRedeSocial();
  }

  @Get(':redSocialId')
  async findOne(@Param('redSocialId') redSocialId: string) {
    return await this.redSocialService.findRedSocialById(redSocialId);
  }

  @Post()
  async create(@Body() redSocialDto: RedSocialDTO) {
    const redSocial: RedSocialEntity = plainToInstance(RedSocialEntity, redSocialDto);
    return await this.redSocialService.createRedSocial(redSocial);
  }

  @Put(':redSocialId')
  async update(@Param('redSocialId') redSocialId: string, @Body() redSocialDto: RedSocialDTO) {
    const redSocial: RedSocialEntity = plainToInstance(RedSocialEntity, redSocialDto);
    return await this.redSocialService.updateRedSocial(redSocialId, redSocial);
  }

  @Delete(':redSocialId')
  @HttpCode(204)
  async delete(@Param('redSocialId') redSocialId: string) {
    return await this.redSocialService.deleteRedSocial(redSocialId);
  }

}