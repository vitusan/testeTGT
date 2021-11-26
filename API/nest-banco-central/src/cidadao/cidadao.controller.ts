import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { CidadaoService } from './cidadao.service';
import { CreateCidadaoDto } from './dto/create-cidadao.dto';
import { UpdateCidadaoDto } from './dto/update-cidadao.dto';

@Controller('/openbanking/cidadao')
export class CidadaoController {
  constructor(private readonly cidadaoService: CidadaoService) {}

  @Post()
  create(@Body() createCidadaoDto: CreateCidadaoDto) {
    return this.cidadaoService.create(createCidadaoDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cidadaoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCidadaoDto: UpdateCidadaoDto) {
    return this.cidadaoService.update(id, updateCidadaoDto);
  }
}
