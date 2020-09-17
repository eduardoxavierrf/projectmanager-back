import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import CreateProjectService from '../services/CreateProjectService';
import Project from '../models/Project';

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
}
