/* eslint-disable no-useless-constructor */
import AppError from '../../../shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';

export default class DeleteUserService {
    constructor(private userRepository: IUserRepository) {}

    public async execute(
        user_id: string,
        request_user_id: string,
    ): Promise<boolean> {
        if (!(user_id === request_user_id)) {
            throw new AppError(
                'No permission to delete this user',
                'Sem permissão para deletar esse usuário!',
                401,
            );
        }

        await this.userRepository.delete(user_id);
        return true;
    }
}
