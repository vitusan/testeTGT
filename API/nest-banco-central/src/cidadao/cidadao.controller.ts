import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiFoundResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CidadaoService } from './cidadao.service';
import { CreateCidadaoDto } from './dto/create-cidadao.dto';
import { UpdateCidadaoDto } from './dto/update-cidadao.dto';

@ApiTags('cidadao')
@Controller('/openbanking/cidadao')
export class CidadaoController {
  constructor(private readonly cidadaoService: CidadaoService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastra um cidadão no sistema' })
  @ApiCreatedResponse({
    description: 'Cidadão cadastrado com sucesso',
  })
  @ApiForbiddenResponse({
    description: 'Cidadão já cadastrado na base de dados',
  })
  @ApiBadRequestResponse({
    description: 'Informações incorretas no corpo da requisição',
  })
  create(@Body() createCidadaoDto: CreateCidadaoDto) {
    return this.cidadaoService.create(createCidadaoDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Consulta as informações de um cidadão através de UUID ou CPF',
  })
  @ApiParam({ name: 'id', description: 'UUID ou CPF', type: 'string' })
  @ApiFoundResponse({
    description: 'JSON contendo as informações do cidadao',
  })
  @ApiNotFoundResponse({
    description: 'Cidadão não encontrado na base de dados',
  })
  @ApiBadRequestResponse({ description: 'UUID ou CPF incorretos' })
  findOne(@Param('id') id: string) {
    return this.cidadaoService.findOne(id);
  }

  @ApiOperation({
    summary: 'Atualiza as informações de um cidadão através de UUID ou CPF',
  })
  @ApiParam({ name: 'id', description: 'UUID ou CPF', type: 'string' })
  @ApiOkResponse({
    description: 'Informações atualizadas com sucesso.',
  })
  @ApiNotFoundResponse({
    description: 'Cidadão não encontrado na base de dados',
  })
  @ApiBadRequestResponse({
    description:
      'Campos inválidos presentes no Corpo da requisição ou UUID ou CPF incorretos',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCidadaoDto: UpdateCidadaoDto) {
    return this.cidadaoService.update(id, updateCidadaoDto);
  }
}
