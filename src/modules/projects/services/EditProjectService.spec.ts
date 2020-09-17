import EditProjectService from './EditProjectService';
import CreateProjectService from './CreateProjectService';
import FakeProjectRepository from '../repositories/fakes/FakeProjectRepository';

describe('Edit Project', () => {
    it('should be able to edit a project', async () => {
        const projectRepository = new FakeProjectRepository();
        const createProject = new CreateProjectService(projectRepository);
        const editProject = new EditProjectService(projectRepository);

        const project = await createProject.execute({
            name: 'TestDevelopment',
            price: 15000,
            due_date: new Date(),
        });

        const { name, price } = project;

        const editedProject = await editProject.execute({
            project_id: project.id,
            name: 'ChangedName',
            price: 20000,
            due_date: undefined,
        });
        expect(editedProject.due_date).toBe(project.due_date);
        expect(editedProject.name).not.toBe(name);
        expect(editedProject.price).not.toBe(price);
    });
});
