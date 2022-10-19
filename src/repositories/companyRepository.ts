import { Company } from "../models/Company";
import { AppDataSource } from "./dataSource";

export const CompanyRepository = AppDataSource.getRepository(Company).extend({
  async findById(id: number): Promise<Company> {
    return await this.createQueryBuilder('company')
    .where('company.id = :id', { id: id })
    .getOne();
  },

  async findByName(inputSearch: string): Promise<Company> {
    return await this.createQueryBuilder('company')
    .where('company.name like :name', { name:`%${inputSearch}%` })
    .getMany();
  }
});
