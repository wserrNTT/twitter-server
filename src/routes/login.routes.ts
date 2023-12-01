import { Router } from 'express';
import { sha256, Message } from 'js-sha256';

// Schema
import { userSchema as User, userSchema } from '../schemas';

const loginRouter = Router();

loginRouter.get('/login', async (req, res) => {
  const { loginuser, loginpassword } = req.query;

  try {
    const response = await userSchema.find({ userName: loginuser });
    if (response.length === 0) throw new Error('user not found');

    if (response[0].password !== sha256(loginpassword as Message))
      throw new Error('incorrect password');

    res.status(200).json({ user: response[0] });
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
});

export { loginRouter };
