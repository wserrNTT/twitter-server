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

// Makes user1 follow user2
actionRouter.patch('/follow', async (req, res) => {
  const { followerid: user1id, followingid: user2id } = req.query;
  try {
    const user1 = await User.findById(user1id);
    const user2 = await User.findById(user2id);
    if (!user1 || !user2) throw new Error('user not found');

    user1.following = [...user1.following, user2.id];
    await user1.save();

    user2.followers = [...user2.followers, user1.id];
    await user2.save();

    res.status(200).json(user1.following);
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
});

// Makes user1 stop following user2
actionRouter.patch('/unfollow', async (req, res) => {
  const { followerid: user1id, followingid: user2id } = req.query;
  try {
    const user1 = await User.findById(user1id);
    const user2 = await User.findById(user2id);
    if (!user1 || !user2) throw new Error('user not found');
    user1.following = user1.following.filter((userID) => userID.toString() !== user2.id);
    await user1.save();

    user2.followers = user2.followers.filter((userID) => userID.toString() !== user1.id);
    await user2.save();

    res.status(200).json(user1.following);
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
});

export { actionRouter };
