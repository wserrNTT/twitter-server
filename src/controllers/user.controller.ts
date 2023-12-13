// Schema
import { userSchema as User } from '../schemas';

// Types
import { Request, Response } from 'express';

// Utils
import { sha256 } from 'js-sha256';

// GET all users or GET user by username if given
export const getUsers = async (req: Request, res: Response) => {
  const { username } = req.query;
  if (username) {
    try {
      const response = await User.find({ userName: username });
      if (response.length !== 1) throw new Error('User not found');

      res.status(200).json(response[0]);
    } catch (error) {
      res.status(404).send((error as Error).message);
    }
  } else {
    try {
      const users = await User.find({}, '-password');
      res.json(users);
    } catch (error) {
      res.status(500).send((error as Error).message);
    }
  }
};

// GET user by ID
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

// POST new user
export const postUser = async (req: Request, res: Response) => {
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
};
