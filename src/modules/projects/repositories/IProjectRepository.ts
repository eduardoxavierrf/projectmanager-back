import Project from '../models/Project';
import ICreateProjectDTO from '../dtos/ICreateProjectDTO';

export default interface IProjectRepository {
    create(data: ICreateProjectDTO): Project;
    save(project: Project): Promise<Project>;
}
