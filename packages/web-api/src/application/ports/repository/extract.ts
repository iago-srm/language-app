import { Entity, PrimaryColumn, Column, ManyToOne, RelationId } from "typeorm";
import { UserDTO } from "./user";
import { CategoryDTO } from "./category";

@Entity("extracts")
export class ExtractDTO {
    @PrimaryColumn()
    id?: string;
    @Column()
    amount: number;
    @Column()
    timeStamp: number;
    @Column()
    description: string;
    @Column()
    type: string;

    @ManyToOne(() => UserDTO)
    user?: UserDTO
    @RelationId("user")
    userId: string;
    
    @ManyToOne(() => CategoryDTO, /*, {eager: true}*/)
    category?: CategoryDTO 
    @RelationId("category")
    categoryId: string | null;
};

