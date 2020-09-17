import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';
import AppError from '../../../shared/errors/AppError';

describe('Create User', () => {
    it('should be able to craete a user', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const createUser = new CreateUserService(fakeUserRepository);

        const user = await createUser.execute({
            name: 'TestDevelop',
            email: 'test@development.com',
            password: 'testdevelopment',
        });

        expect(user).toHaveProperty('id');
    });

    it('should not be able to create a user with a email that already exists', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const createUser = new CreateUserService(fakeUserRepository);

        await createUser.execute({
            name: 'TestDevelop',
            email: 'test@development.com',
            password: 'testdevelopment',
        });

        expect(
            createUser.execute({
                name: 'TestDevelop',
                email: 'test@development.com',
                password: 'testdevelopment',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to register a user with a weak password', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const createUser = new CreateUserService(fakeUserRepository);

        expect(
            createUser.execute({
                name: 'TestDevelop',
                email: 'test@development.com',
                password: '123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
