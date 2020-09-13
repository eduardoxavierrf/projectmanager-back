import { getRepository, createConnection, Repository } from 'typeorm';
import { verify } from 'jsonwebtoken';
import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';
import User from '../models/User';
import authConfig from '../../../config/auth';

describe('User Authetication', () => {
    let user: User;
    let userRepository: Repository<User>;
    let createUser: CreateUserService;
    let autheticateUser: AuthenticateUserService;

    beforeAll(async () => {
        await createConnection();
        userRepository = getRepository(User);

        createUser = new CreateUserService();

        user = await createUser.execute({
            name: 'testdevelopment',
            email: 'testdevelopment@development.dev',
            password: 'testdevelopment',
        });
    });

    afterAll(async () => {
        const checkUser = await userRepository.findOne(user.id);
        if (checkUser) {
            await userRepository.delete(user.id);
        }
    });

    it('should be able to autheticate the user', async () => {
        autheticateUser = new AuthenticateUserService();

        const { access_token } = await autheticateUser.execute({
            email: 'testdevelopment@development.dev',
            password: 'testdevelopment',
        });

        const decode = verify(access_token, authConfig.jwt.secret_key);
        expect(decode).toBeInstanceOf(Object);
    });
});
