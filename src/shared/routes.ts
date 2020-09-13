import Router from 'express';

import userRouter from '../modules/users/routes/user.routes';
import sessionRouter from '../modules/users/routes/session.routes';

const router = Router();

router.use('/users', userRouter);
router.use('/auth', sessionRouter);

export default router;
