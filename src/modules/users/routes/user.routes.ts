import Router from 'express';
import EnsureAuthentication from '../../../shared/middleware/EnsureAuthentication';
import UserController from '../ controllers/UserController';

const userController = new UserController();

const userRouter = Router();

userRouter.post('/', userController.create);
userRouter.delete('/:user_id', EnsureAuthentication, userController.delete);
userRouter.get('/', EnsureAuthentication, userController.index);

export default userRouter;
