import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Cidadao extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'nome', type: 'varchar', length: 50 })
  nome: string;

  @Column({ name: 'cpf', type: 'varchar', length: 11 })
  cpf: string;

  @Column({ name: 'endereco', type: 'varchar', length: 255 })
  endereco: string;

  @Column({ name: 'email', type: 'varchar', length: 255 })
  email: string;

  @Column({ name: 'telefone', type: 'varchar', length: 11 })
  telefone: string;

  @Column({ name: 'limite_credito', type: 'money' })
  limiteCredito: number;
}
