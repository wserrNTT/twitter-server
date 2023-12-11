import { Router } from 'express';
import { sha256, Message } from 'js-sha256';
import { Types } from 'mongoose';

// Schema
import { userSchema as User } from '../schemas';

const actionRouter = Router();

// login?loginuser&loginpassword
actionRouter.get('/login', async (req, res) => {
  const { loginuser, loginpassword } = req.query;

  try {
    const response = await User.findOne({ userName: loginuser });
    if (!response) throw new Error('user not found');

    if (response.password !== sha256(loginpassword as Message))
      throw new Error('incorrect password');

    res.status(200).json({ user: response });
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
});

actionRouter.patch('/follow', async (req, res) => {
  const { followerid, followingid } = req.query;
  try {
    const follower = await User.findById(followerid);
    const following = await User.findById(followingid);
    console.log({ follower, following });
    if (!follower || !following) throw new Error('user not found');

    follower.following = [...follower.following, following.id];
    await follower.save();

    following.followers = [...following.followers, follower.id];
    await following.save();

    res
      .status(200)
      .json({ message: `${follower.userName} is now following ${following.userName}` });
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
});

export { actionRouter };
