import { Characteristic } from "../models/Characteristic";
import { AppDataSource } from "./dataSource";

export const CharacteristicRepository = AppDataSource.getRepository(Characteristic);
