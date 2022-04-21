import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  RelationId,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { UserDTO } from './user';
import { ExtractDTO } from './extract';

@Entity('categories')
export class CategoryDTO {
  @PrimaryGeneratedColumn()
  id?: string;
  @Column()
  name: string;

  @ManyToOne(() => UserDTO)
  user?: UserDTO;
  @RelationId('user')
  userId: string;

  @Column()
  total: number;
  @OneToMany(() => ExtractDTO, (extract) => extract.category, {
    eager: true,
    cascade: true,
  })
  extracts: ExtractDTO[];
}
