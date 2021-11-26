import { OmitType } from '@nestjs/swagger';
import { CreateCidadaoDto } from './create-cidadao.dto';

export class UpdateCidadaoDto extends OmitType(CreateCidadaoDto, [
  'nome',
  'cpf',
]) {}
