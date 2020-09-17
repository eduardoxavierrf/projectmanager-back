import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import DeleteUserService from './DeleteUserService';
import CreateUserService from './CreateUserService';
import AppError from '../../../shared/errors/AppError';

describe('Delete User', () => {
    it('should be able to delete a user', async () => {
        const fakeRepository = new FakeUserRepository();
        const createUser = new CreateUserService(fakeRepository);
        const deleteUser = new DeleteUserService(fakeRepository);

        const user = await createUser.execute({
            name: 'TestDevelop',
            email: 'test@development.com',
            password: 'testdevelopment',
        });

        await deleteUser.execute(user.id, user.id);
    });

    it('should not be able to delete a user with a diferent user request', async () => {
        const fakeRepository = new FakeUserRepository();
        const createUser = new CreateUserService(fakeRepository);
        const deleteUser = new DeleteUserService(fakeRepository);

        const user = await createUser.execute({
            name: 'TestDevelop',
            email: 'test@development.com',
            password: 'testdevelopment',
        });

        expect(
            deleteUser.execute(user.id, 'asdasda-asdasd-asdasda'),
        ).rejects.toBeInstanceOf(AppError);
    });
});
