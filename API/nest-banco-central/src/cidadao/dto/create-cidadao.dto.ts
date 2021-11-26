import { IsCPF, IsPhone } from 'brazilian-class-validator';
import {
  IsEmail,
  IsNotEmpty,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class CreateCidadaoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsCPF()
  @Length(11, 11)
  cpf: string;

  @IsString()
  @Length(15, 255)
  endereco: string;

  @IsEmail()
  email: string;

  @IsPhone()
  telefone: string;

  @IsPositive()
  limiteCredito: number;
}
