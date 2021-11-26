import { Cidadao } from './entities/cidadao.entity';
import {
  ForbiddenException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCidadaoDto } from './dto/create-cidadao.dto';
import { UpdateCidadaoDto } from './dto/update-cidadao.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CidadaoService {
  constructor(
    @InjectRepository(Cidadao) private readonly repository: Repository<Cidadao>,
  ) {}

  async create(createCidadaoDto: CreateCidadaoDto): Promise<Cidadao> {
    const cidadao = this.repository.create(createCidadaoDto);
    if ((await this.findOneByCPF(cidadao.id)) === undefined) {
      throw new ForbiddenException('CPF já cadastrado no sistema.');
    }
    return this.repository.save(cidadao);
  }

  findOne(id: string): Promise<Cidadao> {
    return this.repository.findOne(id);
  }

  findOneByCPF(cpf: string): Promise<Cidadao> {
    return this.repository.findOne(cpf);
  }

  async update(
    id: string,
    updateCidadaoDto: UpdateCidadaoDto,
  ): Promise<Cidadao> {
    const allowedFields = ['endereco', 'email', 'telefone', 'limiteCredito'];
    Object.entries(updateCidadaoDto).forEach((prop) => {
      if (!allowedFields.includes(prop[0])) {
        throw new NotAcceptableException(
          `Parâmetros de requisição inválidos para o campo ${prop[0]}.`,
        );
      }
    });
    const cidadao = await this.repository.preload({
      id: id,
      ...updateCidadaoDto,
    });
    if (!cidadao) {
      throw new NotFoundException(`Cidadão de id: ${id} não encontrado.`);
    }
    return this.repository.save(cidadao);
  }
}
