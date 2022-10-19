import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Review } from "./Review";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: 'name' })
    email: string

    @Column({ name: 'job_position' })
    jobPosition: string

    @Column({ name: 'job_location' })
    jobLocation: string

    @OneToMany(() => Review, (review) => review.user)
    reviews: Review[]

}
