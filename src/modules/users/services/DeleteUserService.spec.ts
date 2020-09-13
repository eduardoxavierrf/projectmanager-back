import { getRepository, createConnection, Repository } from 'typeorm';
import CreateUserService from './CreateUserService';
import DeleteUserService from './DeleteUserService';
import User from '../models/User';
import AppError from '../../../shared/errors/AppError';

describe('Delete User', () => {
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

    it('should be able to delete a user', async () => {
        const deleteUser = new DeleteUserService();

        const deleted = await deleteUser.execute(user.id, user.id);
        expect(deleted).toBe(true);
    });

    it('should not be able to delete other user', async () => {
        const deleteUser = new DeleteUserService();
        let resp: AppError | boolean;
        try {
            resp = await deleteUser.execute(user.id, 'asdasdas-dasdasd');
        } catch (error) {
            resp = error;
        }
        expect(resp).toBeInstanceOf(AppError);
    });
});
