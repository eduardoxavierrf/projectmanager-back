import { uuid } from 'uuidv4';
import Project from '../../models/Project';
import IProjectRepository from '../IProjectRepository';
import ICreateProjectDTO from '../../dtos/ICreateProjectDTO';

export default class FakeProjectRepository implements IProjectRepository {
    private projects: Project[] = [];

    public create({ name, price, due_date }: ICreateProjectDTO): Project {
        const project = new Project();

        project.id = uuid();
        project.name = name;
        project.price = price;
        project.due_date = due_date;

        return project;
    }

    public async save(project: Project): Promise<Project> {
        this.projects.push(project);

        return project;
    }
}
