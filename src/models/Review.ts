import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Characteristic } from "./Characteristic";
import { Company } from "./Company";
import { User } from "./User";

@Entity()
export class Review {

    @PrimaryGeneratedColumn()
    id: number

    @Column('timestamp', { name: 'created_at', nullable: false })
    createdAt: Date

    @Column({ name: 'review_text' })
    reviewText: string

    @Column()
    rating: number

    @ManyToOne(() => Company, (company) => company.reviews)
    @JoinColumn({ name: "company_id" })
    company: Company

    @ManyToOne(() => User, (user) => user.reviews)
    @JoinColumn({ name: 'user_id' })
    user: User

    @ManyToOne(() => Characteristic, (characteristic) => characteristic.reviews)
    @JoinColumn({ name: 'characteristic_id' })
    characteristic: Characteristic

}
