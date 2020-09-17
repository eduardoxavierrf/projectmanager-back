import { ObjectID, FindOneOptions } from 'typeorm';
import Project from '../models/Project';
import ICreateProjectDTO from '../dtos/ICreateProjectDTO';

export default interface IProjectRepository {
    create(data: ICreateProjectDTO): Project;
    save(project: Project): Promise<Project>;
    findOne(
        id?: string | number | Date | ObjectID,
        options?: FindOneOptions<Project>,
    ): Promise<Project | undefined>;
}
