import { User } from "../models/User";
import { AppDataSource } from "./dataSource";

export const UserRepository = AppDataSource.getRepository(User).extend({
  async findByEmail(email: string): Promise<User> {
    return await this.createQueryBuilder('user')
    .where('user.email = :email', { email: email })
    .getOne();
  },
});
