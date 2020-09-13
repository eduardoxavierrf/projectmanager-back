import express from 'express';
import 'express-async-errors';

import './shared/database';
import router from './shared/routes';
import ErrorHandler from './shared/middleware/ErrorHandler';

const app = express();

app.use(express.json());
app.use(router);
app.use(ErrorHandler);

app.listen(3333, () => {
    console.log('Server listening on port 3333');
});
