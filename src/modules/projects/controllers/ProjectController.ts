import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import CreateProjectService from '../services/CreateProjectService';
import Project from '../models/Project';
import EditProjectService from '../services/EditProjectService';

export default class ProjectController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, price, due_date } = request.body;

        const projectRepository = getRepository(Project);

        const createProject = new CreateProjectService(projectRepository);

        const project = await createProject.execute({
            name,
            price,
            due_date,
        });

        return response.status(201).json(project);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { project_id } = request.params;
        const { name, price, due_date } = request.body;

        const projectRepository = getRepository(Project);
        const editProject = new EditProjectService(projectRepository);

        const project = await editProject.execute({
            project_id,
            name,
            price,
            due_date,
        });

        return response.status(200).json(project);
    }
}
