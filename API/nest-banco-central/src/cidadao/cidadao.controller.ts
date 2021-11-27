import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { CidadaoService } from './cidadao.service';
import { CreateCidadaoDto } from './dto/create-cidadao.dto';
import { UpdateCidadaoDto } from './dto/update-cidadao.dto';

@Controller('/openbanking/cidadao')
export class CidadaoController {
  constructor(private readonly cidadaoService: CidadaoService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Cidadão cadastrado com sucesso!',
  })
  create(@Body() createCidadaoDto: CreateCidadaoDto) {
    return this.cidadaoService.create(createCidadaoDto);
  }

  @ApiFoundResponse({
    description: 'Cidadão localizado com sucesso no banco de dados.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cidadaoService.findOne(id);
  }

  @ApiOkResponse({
    description: 'Informações atualizadas com sucesso.',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCidadaoDto: UpdateCidadaoDto) {
    return this.cidadaoService.update(id, updateCidadaoDto);
  }
}
