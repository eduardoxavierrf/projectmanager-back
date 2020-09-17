import { uuid } from 'uuidv4';
import { DeleteResult } from 'typeorm';
import IUserRepository from '../IUserRepository';
import User from '../../models/User';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';

export default class FakeUserRepository implements IUserRepository {
    private users: User[] = [];

    public create({ name, email, password }: ICreateUserDTO): User {
        const user = new User();

        user.id = uuid();
        user.email = email;
        user.name = name;
        user.password = password;
        user.created_at = new Date();
        user.updated_at = null;

        return user;
    }

    public async save(user: User): Promise<User> {
        this.users.push(user);

        return user;
    }

    public async findByEmail(email: string): Promise<User> {
        const findUser = this.users.find(user => user.email === email);
        if (!findUser) {
            return findUser;
        }
        return findUser;
    }

    public async delete(user_id: string): Promise<DeleteResult> {
        const userIndex = this.users.findIndex(user => user.id === user_id);

        this.users.splice(userIndex, 1);

        const result = new DeleteResult();

        result.raw = 'null';
        result.affected = 1;

        return result;
    }
}
