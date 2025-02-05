import { Router } from 'express';
import usersController from '../controllers/users.js';
import validation from '../middlewares/validation.js';

const router = Router();

const {
    getUsers,
    getCurrentUser,
    getUser,
    resetPassword,
    patchUser,
} = usersController;

const {
    currentUserValidation,
    userValidation,
} = validation;

router.get('/', getUsers);
router.get('/me', getUser);
router.get('/:id', currentUserValidation, getCurrentUser);
router.post('/reset-password', resetPassword);
router.patch('/me', userValidation, patchUser);

export default router;
