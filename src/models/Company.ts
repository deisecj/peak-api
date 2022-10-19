import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Review } from "./Review";

@Entity()
export class Company {

    @PrimaryGeneratedColumn()
    id: number

    @Column('text', { nullable: false })
    name: string

    @Column()
    info: string

    @OneToMany(() => Review, (review) => review.company)
    reviews: Review[]

}
