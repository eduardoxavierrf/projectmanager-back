/* eslint-disable no-useless-constructor */
import IProjectRepository from '../repositories/IProjectRepository';
import Project from '../models/Project';

interface IRequest {
    name: string;
    price: number;
    due_date: Date;
}

export default class CreateProjectService {
    constructor(private projectRepository: IProjectRepository) {}

    public async execute({
        name,
        price,
        due_date,
    }: IRequest): Promise<Project> {
        const project = await this.projectRepository.create({
            name,
            price,
            due_date,
        });

        await this.projectRepository.save(project);

        return project;
    }
}
