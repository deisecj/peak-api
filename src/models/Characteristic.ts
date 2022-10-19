import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import { Review } from "./Review";

@Entity()
export class Characteristic {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    group: string

    @Column()
    type: string

    @Column('text')
    full_description: string

    @Column('text')
    short_description: string

    @OneToMany(() => Review, (review) => review.characteristic)
    reviews: Review[]

}
