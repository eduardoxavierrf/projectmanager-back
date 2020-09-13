import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import CreateUserService from '../services/CreateUserService';
import DeleteUserService from '../services/DeleteUserService';
import User from '../models/User';
import AppError from '../../../shared/errors/AppError';

export default class UserController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({ name, email, password });

        return response.status(201).json(user);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { user_id } = request.params;

        const deleteUser = new DeleteUserService();

        await deleteUser.execute(user_id, request.user.id);

        return response.status(204).json();
    }

    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { page } = request.query;
        const pageNumber = Number(page);

        if (isNaN(pageNumber)) {
            throw new AppError(
                'Page is not a number',
                'Pagina não pe um numero',
            );
        }

        if (pageNumber < 0) {
            throw new AppError(
                'Page must be zero or bigger',
                'Pagina tem que ser zero ou maior',
            );
        }

        const userRepository = getRepository(User);
        const usersCount = await userRepository.count();
        const users = await userRepository.find({
            skip: 10 * pageNumber,
            take: 10,
        });

        const previous =
            pageNumber > 0
                ? `${request.baseUrl}?page=${pageNumber - 1}`
                : undefined;

        const resp = {
            count: usersCount,
            previous,
            next: `${request.baseUrl}?page=${pageNumber + 1}`,
            results: users,
        };

        return response.status(200).json(resp);
    }
}
