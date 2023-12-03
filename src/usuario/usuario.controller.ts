import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { UsuarioDTO } from './usuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioService } from './usuario.service';

@Controller('users')
@UseInterceptors(BusinessErrorsInterceptor)
export class userController {
    constructor(private readonly userService: UsuarioService) {}

  @Get()
  async findAll() {
    return await this.userService.findAllUsuarios();
  }

  @Get(':userId')
  async findOne(@Param('userId') userId: string) {
    return await this.userService.findUsuarioById(userId);
  }

  @Post()
  async create(@Body() userDto: UsuarioDTO) {
    const user: UsuarioEntity = plainToInstance(UsuarioEntity, userDto);
    return await this.userService.createUsuario(user);
  }

  @Put(':userId')
  async update(@Param('userId') userId: string, @Body() userDto: UsuarioDTO) {
    const user: UsuarioEntity = plainToInstance(UsuarioEntity, userDto);
    return await this.userService.updateUsuario(userId, user);
  }

  @Delete(':userId')
  @HttpCode(204)
  async delete(@Param('userId') userId: string) {
    return await this.userService.deleteUsuario(userId);
  }

}