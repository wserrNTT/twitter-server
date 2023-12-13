import { Router } from 'express';

// Controller
import { getUsers, getUserById, postUser } from '../controllers/user.controller';

const userRouter = Router();

// GET all users or GET user by username if given
userRouter.get('/users', getUsers);

// GET user by ID
userRouter.get('/users/:id', getUserById);

// POST new user
userRouter.post('/users', postUser);

export { userRouter };
