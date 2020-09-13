import { Response, Request } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

export default class AuthenticateController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email, password } = request.body;

        const autheticateUser = new AuthenticateUserService();

        const { user, access_token } = await autheticateUser.execute({
            email,
            password,
        });

        return response.status(200).json({ user, access_token });
    }
}
