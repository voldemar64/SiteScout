import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import usersController from './controllers/users.js';
import validation from './middlewares/validation.js';
import auth from './middlewares/auth.js';
import logger from './middlewares/logger.js';
import errorHandler from './middlewares/errors.js';
import NotFound from './errors/NotFound.js';
import corsMiddleware from './middlewares/cors.js';
import userRoutes from './routes/users.js';

const { PORT = 5000 } = process.env;
const app = express();

const { requestLogger, errorLogger } = logger;
const { login, createUser } = usersController;
const { signinValidation, signupValidation } = validation;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware);
app.use(requestLogger);

// Public routes
app.post('/signup', signupValidation, createUser);
app.post('/signin', signinValidation, login);

// Protected routes
app.use(auth);
app.use('/users', userRoutes);

// Error handling
app.use(errorLogger);
app.use('*', (_req, res, next) => {
    next(new NotFound('Страница не найдена'));
});
app.use(errors());
app.use(errorHandler);

// Database connection
(async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/sitescoutdb', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        logger.logger.info('База данных подключена');
    } catch (err) {
        logger.logger.error(`Ошибка подключения к базе данных: ${err.message}`);
        process.exit(1); // Завершаем процесс, если база данных не подключена
    }
})();

// Server start
app.listen(PORT, () => {
    logger.logger.info(`Сервер запущен на порту: ${PORT}`);
});
