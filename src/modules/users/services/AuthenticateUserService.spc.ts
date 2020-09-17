/* import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('Authenticate User', () => {
    it('should be able to authenticate the user', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const createUser = new CreateUserService(fakeUserRepository);
        const authenticateUser = new AuthenticateUserService(
            fakeUserRepository,
        );

        await createUser.execute({
            name: 'TestDevelop',
            email: 'test@development.com',
            password: 'testdevelopment',
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { user, access_token } = await authenticateUser.execute({
            email: 'test@development.com',
            password: 'testdevelopment',
        });

        expect(user).toHaveProperty('id');
    });
});
*/
