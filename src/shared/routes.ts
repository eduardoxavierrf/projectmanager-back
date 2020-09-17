import Router from 'express';

import userRouter from '../modules/users/routes/user.routes';
import sessionRouter from '../modules/users/routes/session.routes';
import projectRouter from '../modules/projects/routes/project.routes';

const router = Router();

router.use('/users', userRouter);
router.use('/auth', sessionRouter);
router.use('/projects', projectRouter);

export default router;
