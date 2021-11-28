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
import { isUUID, isCPF } from '../../util/uuidValidator';

@Injectable()
export class CidadaoService {
  constructor(
    @InjectRepository(Cidadao) private readonly repository: Repository<Cidadao>,
  ) {}

  async create(createCidadaoDto: CreateCidadaoDto): Promise<Cidadao> {
    const cidadao = this.repository.create(createCidadaoDto);
    if ((await this.repository.findOne({ cpf: cidadao.cpf })) === undefined) {
      return this.repository.save(cidadao);
    }
    throw new ForbiddenException('Cidadão já cadastrado no sistema.');
  }

  async findOne(id: string): Promise<Cidadao> {
    if (isUUID(id) || isCPF(id)) {
      let cidadao;
      if (isUUID(id)) {
        cidadao = await this.repository.findOne(id);
      } else {
        cidadao = await this.repository.findOne({ cpf: id });
      }
      if (cidadao !== undefined) {
        return cidadao;
      } else {
        throw new NotFoundException('Cidadão não encontrado.');
      }
    } else {
      throw new BadRequestException(`Id de cidadão inválido.`);
    }
  }

  async update(
    id: string,
    updateCidadaoDto: UpdateCidadaoDto,
  ): Promise<Cidadao> {
    if (isUUID(id) || isCPF(id)) {
      const allowedFields = ['endereco', 'email', 'telefone', 'limiteCredito'];
      const invalidBodyFileds = [];
      Object.entries(updateCidadaoDto).forEach((prop) => {
        if (!allowedFields.includes(prop[0])) {
          invalidBodyFileds.push(prop[0]);
        }
      });
      if (invalidBodyFileds.length === 0) {
        const cidadaoBase = await this.findOne(id);
        const updatedCidadao = await this.repository.preload({
          id: cidadaoBase.id,
          ...updateCidadaoDto,
        });
        if (updatedCidadao) {
          return this.repository.save(updatedCidadao);
        } else {
          throw new NotFoundException(`Cidadão de id: ${id} não encontrado.`);
        }
      } else {
        throw new BadRequestException(
          `Corpo de requisição inválido para o(s) campo(s): ${invalidBodyFileds.toString()}.`,
        );
      }
    } else {
      throw new BadRequestException(`ID de cidadão inválido.`);
    }
  }
}
