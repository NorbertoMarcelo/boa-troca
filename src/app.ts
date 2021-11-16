import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';

import swaggerUi from 'swagger-ui-express';

import createConnection from '@database/index';
import '@database/container';

import { router } from '@routes/index';
import { exceptionHandling } from '@middlewares/exceptionHandling';

import swaggerFile from './swagger.json';

createConnection();

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(exceptionHandling);

export { app };
