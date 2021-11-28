import { ApiProperty } from '@nestjs/swagger';
import { IsCPF, IsPhone } from 'brazilian-class-validator';
import {
  IsEmail,
  IsNotEmpty,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class CreateCidadaoDto {
  @ApiProperty({
    example: 'Roberto Pêra',
  })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({
    example: '73489445074',
    description: 'Apenas 11 dígiots e nenhuma pontuação. Um CPF válido.',
  })
  @IsCPF()
  @Length(11, 11)
  cpf: string;

  @ApiProperty({
    example: 'Distrito Federal/Brasília, Setor Comercial Sul.',
    description: 'Qualquer endereço com mais de 15 caracteres',
  })
  @IsString()
  @Length(15, 255)
  endereco: string;

  @ApiProperty({
    example: 'srincrivel@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '61997854224',
    description: 'DDD + nono dígito opcional + 8 caracteres.',
  })
  @IsPhone()
  telefone: string;

  @ApiProperty({
    example: '1000.00',
    description: 'Quantias positivas.',
  })
  @IsPositive()
  limiteCredito: number;
}
