import { EntityRepository, Repository } from 'typeorm';
import User from '../models/User';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
    public async findByEmail(email: string): Promise<User> {
        return this.findOne({
            where: { email },
        });
    }
}
