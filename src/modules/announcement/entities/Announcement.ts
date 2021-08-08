import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('announcement')
export class Announcement {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: string;

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
