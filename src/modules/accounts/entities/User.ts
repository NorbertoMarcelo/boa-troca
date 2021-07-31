import { IsAlphanumeric, IsEmail, IsString, Max, Min } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('users')
@Unique(['email', 'cpf'])
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  @IsString()
  @Min(3)
  @Max(30)
  name: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsAlphanumeric()
  @Min(6)
  @Max(30)
  password: string;

  @Column()
  @IsString()
  cpf: string;

  @Column()
  @IsString()
  cep: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
