import { Review } from "../models/Review";
import { AppDataSource } from "./dataSource";

export const ReviewRepository = AppDataSource.getRepository(Review).extend({
  async getTotalReviewByCompany(companyId: number): Promise<number> {
    return await this.createQueryBuilder('r')
        .select('COUNT(DISTINCT(r.user)) as total')
        .where('r.company = :id', { id: companyId })
        .getRawOne()

  },

  async getAverageRatings(companyId: number): Promise<any[]>{
    return await this.createQueryBuilder('r')
      .select('AVG(r.rating) as rating, r.characteristic')
      .where('r.company = :id', { id: companyId })
      .groupBy('r.characteristic')
      .getRawMany()

  },

  async getReviewDetails(companyId: number) {
    return await this.createQueryBuilder('r')
      .innerJoinAndSelect('r.company', 'company')
      .innerJoinAndSelect('r.user', 'user')
      .innerJoinAndSelect('r.characteristic', 'characteristic')
      .where('r.company = :id', { id: companyId })
      .getMany()
  }
});
