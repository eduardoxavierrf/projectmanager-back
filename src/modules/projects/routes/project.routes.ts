import Router from 'express';
import EnsureAuthentication from '../../../shared/middleware/EnsureAuthentication';
import ProjectController from '../controllers/ProjectController';

const projectController = new ProjectController();

const projectRouter = Router();

projectRouter.use(EnsureAuthentication);
projectRouter.post('/', projectController.create);
projectRouter.patch('/:project_id', projectController.update);

export default projectRouter;
