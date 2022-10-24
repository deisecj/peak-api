import "reflect-metadata";
import { DataSource } from "typeorm";
import { Characteristic } from "../models/Characteristic";
import { Company } from "../models/Company";
import { Review } from "../models/Review";
import { User } from "../models/User";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: false,
    entities: [Company, User, Characteristic, Review],
    migrations: [],
    subscribers: [],
})
