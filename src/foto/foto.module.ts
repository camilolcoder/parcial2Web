import { Module } from '@nestjs/common';
import { FotoService } from './foto.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FotoEntity } from './foto.entity';
import { FotoController } from './foto.controller';

@Module({
    providers: [FotoService],
    imports: [TypeOrmModule.forFeature([FotoEntity])],
    controllers: [FotoController],
})
export class FotoModule {}
