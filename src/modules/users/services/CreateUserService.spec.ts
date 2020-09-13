import { getRepository, createConnection, Repository } from 'typeorm';
import { compare } from 'bcryptjs';
import CreateUserService from './CreateUserService';
import User from '../models/User';
import AppError from '../../../shared/errors/AppError';

describe('Create User', () => {
    let user: User;
    let userRepository: Repository<User>;
    let createUser: CreateUserService;

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

    it('should be able to create user', async () => {
        const insertedUser = await userRepository.findOne(user.id);

        expect(user.id).toEqual(insertedUser?.id);
    });

    it('should not be able to register an email that already exists', async () => {
        let error: AppError | undefined;
        try {
            const insetedUser = await createUser.execute({
                name: 'TestEduardo',
                email: 'testdevelopment@development.dev',
                password: '123456',
            });
            await userRepository.delete(insetedUser);
            error = undefined;
        } catch (e) {
            error = e;
        }

        expect(error?.statusCode).toBe(400);
    });

    it('should hash the user password', async () => {
        const checkUser = await userRepository.findOne(user.id);
        if (!checkUser) {
            throw new Error('User not found');
        }

        const passwordMatch = await compare(
            'testdevelopment',
            checkUser.password,
        );

        expect(passwordMatch).toEqual(true);
    });
});
