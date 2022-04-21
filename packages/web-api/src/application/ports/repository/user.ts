import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CategoryDTO } from './category';
import { ExtractDTO } from './extract';

@Entity('users')
export class UserDTO {
  @PrimaryGeneratedColumn()
  id?: string;
  @Column()
  name: string;
  @Column({ unique: true })
  email: string;
  @Column({ unique: true })
  cpf: string;
  @Column()
  hashedPassword: string;
  @OneToMany(() => CategoryDTO, (category) => category.user, {
    cascade: true,
  })
  categories: CategoryDTO[];
  @OneToMany(() => ExtractDTO, (extract) => extract.user, {
    cascade: true,
  })
  extracts: ExtractDTO[];
  @Column()
  lastExtractFetch: number;
}
