import { getRepository } from 'typeorm';
import User from '../models/User';
import AppError from '../../../shared/errors/AppError';

export default class DeleteUserService {
    public async execute(
        user_id: string,
        request_user_id: string,
    ): Promise<boolean> {
        const userRepository = getRepository(User);

        if (!(user_id === request_user_id)) {
            throw new AppError(
                'No permission to delete this user',
                'Sem permissão para deletar esse usuário!',
                401,
            );
        }

        await userRepository.delete(user_id);
        return true;
    }
}
