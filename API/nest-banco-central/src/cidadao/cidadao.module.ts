import { Module } from '@nestjs/common';
import { CidadaoService } from './cidadao.service';
import { CidadaoController } from './cidadao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cidadao } from './entities/cidadao.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cidadao])],
  controllers: [CidadaoController],
  providers: [CidadaoService],
})
export class CidadaoModule {}
