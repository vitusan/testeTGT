import { Cidadao } from './entities/cidadao.entity';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCidadaoDto } from './dto/create-cidadao.dto';
import { UpdateCidadaoDto } from './dto/update-cidadao.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from '../../util/uuidValidator';

@Injectable()
export class CidadaoService {
  constructor(
    @InjectRepository(Cidadao) private readonly repository: Repository<Cidadao>,
  ) {}

  async create(createCidadaoDto: CreateCidadaoDto): Promise<Cidadao> {
    const cidadao = this.repository.create(createCidadaoDto);
    if ((await this.repository.findOne({ cpf: cidadao.cpf })) !== undefined) {
      throw new ForbiddenException('CPF já cadastrado no sistema.');
    }
    return this.repository.save(cidadao);
  }

  async findOne(id: string): Promise<Cidadao> {
    if (!validate(id)) {
      throw new BadRequestException(`UUID inválido.`);
    }
    const cidadao = await this.repository.findOne(id);
    if (cidadao !== undefined) {
      return this.repository.findOne(id);
    } else {
      throw new NotFoundException('Cidadão não encontrado.');
    }
  }

  async update(
    id: string,
    updateCidadaoDto: UpdateCidadaoDto,
  ): Promise<Cidadao> {
    if (!validate(id)) {
      throw new BadRequestException(`UUID inválido.`);
    }
    const allowedFields = ['endereco', 'email', 'telefone', 'limiteCredito'];
    const invalidReqParams = [];
    Object.entries(updateCidadaoDto).forEach((prop) => {
      if (!allowedFields.includes(prop[0])) {
        invalidReqParams.push(prop[0]);
      }
    });
    if (invalidReqParams.length > 0) {
      throw new BadRequestException(
        `Parâmetros de requisição inválidos para o(s) campo(s): ${invalidReqParams.toString()}.`,
      );
    }
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
