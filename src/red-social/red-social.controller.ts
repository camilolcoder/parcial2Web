import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { RedSocialDTO } from './red-social.dto';
import { RedSocialEntity } from './red-social.entity';
import { RedSocialService } from './red-social.service';

@Controller('users')
@UseInterceptors(BusinessErrorsInterceptor)
export class userController {
    constructor(private readonly userService: RedSocialService) {}

  @Get()
  async findAll() {
    return await this.userService.findAllRedeSocial();
  }

  @Get(':userId')
  async findOne(@Param('userId') userId: string) {
    return await this.userService.findRedSocialById(userId);
  }

  @Post()
  async create(@Body() userDto: RedSocialDTO) {
    const user: RedSocialEntity = plainToInstance(RedSocialEntity, userDto);
    return await this.userService.createRedSocial(user);
  }

  @Put(':userId')
  async update(@Param('userId') userId: string, @Body() userDto: RedSocialDTO) {
    const user: RedSocialEntity = plainToInstance(RedSocialEntity, userDto);
    return await this.userService.updateRedSocial(userId, user);
  }

  @Delete(':userId')
  @HttpCode(204)
  async delete(@Param('userId') userId: string) {
    return await this.userService.deleteRedSocial(userId);
  }

}