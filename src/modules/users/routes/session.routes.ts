import Router from 'express';

import AuthenticateController from '../ controllers/AuthenticateController';

const authenticateUserController = new AuthenticateController();

const sessionRouter = Router();

sessionRouter.post('/', authenticateUserController.create);

export default sessionRouter;
