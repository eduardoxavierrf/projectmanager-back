import { uuid } from 'uuidv4';
import { FindOneOptions, ObjectID } from 'typeorm';
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
        const foundProject = this.projects.findIndex(
            existProject => existProject.id === project.id,
        );

        this.projects.splice(foundProject, 1);

        this.projects.push(project);

        return project;
    }

    public async findOne(
        id?: string | number | Date | ObjectID,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        options?: FindOneOptions<Project>,
    ): Promise<Project | undefined> {
        const project = this.projects.find(
            foundProject => foundProject.id === id,
        );

        return project;
    }
}
