// Schema
import { hashtagSchema as Hashtag } from '../schemas';

// Types
import { Request, Response } from 'express';

// GET all hashtags
export const getHashtags = async (req: Request, res: Response) => {
  try {
    const hashtags = await Hashtag.find();
    res.json(hashtags);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

// GET hashtag by name
export const getHashtagByName = async (req: Request, res: Response) => {
  const { name } = req.params;
  try {
    const hashtag = await Hashtag.findOne({ name });
    res.json(hashtag);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

// POST new hashtag
export const postHashtag = async (req: Request, res: Response) => {
  try {
    const hashtag = new Hashtag(req.body);
    await hashtag.save();
    res.status(200).json({ message: 'hashtag created' });
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};
