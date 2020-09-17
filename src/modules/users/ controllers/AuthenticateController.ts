import { Response, Request } from 'express';

import { getCustomRepository } from 'typeorm';
import UserRepository from '../repositories/UserRepository';
import AuthenticateUserService from '../services/AuthenticateUserService';

export default class AuthenticateController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email, password } = request.body;

        const userRepository = getCustomRepository(UserRepository);
        const autheticateUser = new AuthenticateUserService(userRepository);

        const { user, access_token } = await autheticateUser.execute({
            email,
            password,
        });

        return response.status(200).json({ user, access_token });
    }
}
