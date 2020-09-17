import FakeProjectRepository from '../repositories/fakes/FakeProjectRepository';
import CreateProjectService from './CreateProjectService';

describe('Create Project', () => {
    it('should be able to crate a new project', async () => {
        const fakeProjectRepository = new FakeProjectRepository();
        const createProject = new CreateProjectService(fakeProjectRepository);

        const project = await createProject.execute({
            name: 'App Fluxo',
            price: 13000,
            due_date: new Date(),
        });

        expect(project).toHaveProperty('id');
    });
});
