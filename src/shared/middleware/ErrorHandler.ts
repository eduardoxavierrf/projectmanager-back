/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';

export default function ErrorHandler(
    err: Error,
    request: Request,
    response: Response,
    next: NextFunction,
): Response {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({ message: err.message });
    }

    console.log(err);

    return response.status(500).json({
        message: 'Internal server error',
    });
}
