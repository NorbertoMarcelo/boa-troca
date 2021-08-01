import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';

import createConnection from '@database/index';
import '@database/container';

import { router } from '@routes/index';
import { exceptionHandling } from '@middlewares/exceptionHandling';

createConnection();

const app = express();

app.use(express.json());

app.use(router);

app.use(exceptionHandling);

export { app };
