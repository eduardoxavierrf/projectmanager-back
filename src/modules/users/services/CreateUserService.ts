import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../../../shared/errors/AppError';
import User from '../models/User';

interface Request {
    name: string;

    email: string;

    password: string;
}

export default class CreateUserService {
    public async execute({ name, email, password }: Request): Promise<User> {
        if (password.length < 6) {
            throw new AppError(
                'Your password needs to have 6 digits',
                'Sua senha precisa de pelo menos 6 digitos',
            );
        }

        const userRepository = getRepository(User);

        const checkUserExist = await userRepository.findOne({
            where: { email },
        });

        if (checkUserExist) {
            throw new AppError('Email already exists!', 'Email já existe!');
        }

        const hashedPassword = await hash(password, 10);

        const user = userRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        await userRepository.save(user);

        delete user.password;

        return user;
    }
}
