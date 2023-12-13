import { Router } from 'express';

// Controller
import { follow, login, unfollow } from '../controllers/action.controller';

const actionRouter = Router();

// login?loginuser&loginpassword
actionRouter.get('/login', login);

// Makes user1 follow user2
actionRouter.patch('/follow', follow);

// Makes user1 stop following user2
actionRouter.patch('/unfollow', unfollow);

export { actionRouter };
