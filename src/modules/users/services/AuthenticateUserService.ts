/* eslint-disable no-useless-constructor */
import { compare } from 'bcryptjs';

import { sign } from 'jsonwebtoken';
import AppError from '../../../shared/errors/AppError';
import authConfig from '../../../config/auth';

import User from '../models/User';
import IUserRepository from '../repositories/IUserRepository';

interface Request {
    email: string;

    password: string;
}

interface Response {
    user: User;
    access_token: string;
}

class AuthenticateUserService {
    constructor(private userRepository: IUserRepository) {}

    public async execute({ email, password }: Request): Promise<Response> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AppError(
                'Incorrect email/password combination.',
                'Combinação de email/senha incorreta',
                401,
            );
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError(
                'Incorrect email/password combination.',
                'Combinação de email/senha incorreta',
                401,
            );
        }

        const access_token = sign({}, authConfig.jwt.secret_key, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn,
        });

        delete user.password;

        return { user, access_token };
    }
}

export default AuthenticateUserService;
