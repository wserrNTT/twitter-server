import { Router } from 'express';
import { sha256 } from 'js-sha256';

// Schema
import { userSchema as User } from '../schemas';

const userRouter = Router();

// GET all users
userRouter.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

// GET user by ID
userRouter.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

// POST new user
userRouter.post('/users', async (req, res) => {
  try {
    const user = new User({
      password: sha256(req.body.password),
      ...req.body
    });
    await user.save();
    res.status(200).json({ message: 'user created' });
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

export { userRouter };
