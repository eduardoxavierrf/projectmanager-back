/* eslint-disable no-useless-constructor */
import { hash } from 'bcryptjs';
import AppError from '../../../shared/errors/AppError';
import User from '../models/User';
import IUserRepository from '../repositories/IUserRepository';

interface Request {
    name: string;

    email: string;

    password: string;
}

export default class CreateUserService {
    constructor(private userRepository: IUserRepository) {}

    public async execute({ name, email, password }: Request): Promise<User> {
        if (password.length < 6) {
            throw new AppError(
                'Your password needs to have 6 digits',
                'Sua senha precisa de pelo menos 6 digitos',
            );
        }

        const checkUserExist = await this.userRepository.findByEmail(email);

        if (checkUserExist) {
            throw new AppError('Email already exists!', 'Email já existe!');
        }

        const hashedPassword = await hash(password, 10);

        const user = this.userRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        await this.userRepository.save(user);

        delete user.password;

        return user;
    }
}
