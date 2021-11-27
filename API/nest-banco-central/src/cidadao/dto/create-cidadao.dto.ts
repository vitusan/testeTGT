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
    example: '11122233344',
    description: 'Only 11 digits with no punctuation. A valid brazilian CPF.',
  })
  @IsCPF()
  @Length(11, 11)
  cpf: string;

  @ApiProperty({
    example: 'Distrito Federal/Brasília, Setor Comercial Sul.',
    description: 'Any adress with more than 15 caracteres',
  })
  @IsString()
  @Length(15, 255)
  endereco: string;

  @ApiProperty({
    example: 'example@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '61997854224',
    description: 'DDD + optional ninth digit + 8 caracters.',
  })
  @IsPhone()
  telefone: string;

  @ApiProperty({
    example: '1000.00',
    description: 'Positive floating point ammounts',
  })
  @IsPositive()
  limiteCredito: number;
}
