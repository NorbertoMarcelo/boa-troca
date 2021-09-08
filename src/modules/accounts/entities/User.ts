import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Ad } from '@modules/ads/entities/Ad';
import { v4 as uuidV4 } from 'uuid';

@Entity('users')
@Unique(['email', 'cpf'])
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  avatar: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  cpf: string;

  @Column()
  cep: string;

  @OneToMany(() => Ad, (ad) => ad.user)
  @JoinColumn()
  ads: Ad[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
