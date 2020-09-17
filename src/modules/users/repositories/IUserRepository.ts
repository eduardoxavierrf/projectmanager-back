import { DeleteResult } from 'typeorm';
import User from '../models/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUserRepository {
    create(data: ICreateUserDTO): User;
    save(user: User): Promise<User>;
    findByEmail(email: string): Promise<User>;
    delete(user_id: string): Promise<DeleteResult>;
}
