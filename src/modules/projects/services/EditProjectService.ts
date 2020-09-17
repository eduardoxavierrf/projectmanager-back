/* eslint-disable no-useless-constructor */
import IProjectRepository from '../repositories/IProjectRepository';
import Project from '../models/Project';
import AppError from '../../../shared/errors/AppError';

interface IRequest {
    project_id: string;

    name?: string;

    price?: number;

    due_date?: Date;
}

export default class EditProjectService {
    constructor(private projectRepository: IProjectRepository) {}

    public async execute({
        project_id,
        name,
        price,
        due_date,
    }: IRequest): Promise<Project> {
        const project = await this.projectRepository.findOne(project_id);

        if (!project) {
            throw new AppError(
                'This project do not exits',
                'Esse projeto não existe',
            );
        }

        if (name) {
            project.name = name;
        }

        if (price) {
            project.price = price;
        }

        if (due_date) {
            project.due_date = due_date;
        }

        await this.projectRepository.save(project);

        return project;
    }
}
