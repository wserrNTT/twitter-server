import { Router } from 'express';

// Schema
import { hashtagSchema as Hashtag } from '../schemas';

const hashtagRouter = Router();

// GET all hashtags
hashtagRouter.get('/hashtags', async (req, res) => {
  try {
    const hashtags = await Hashtag.find();
    res.json(hashtags);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

// GET hashtag by ID
hashtagRouter.get('/hashtags/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const hashtag = await Hashtag.findById(id);
    res.json(hashtag);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

// POST new hashtag
hashtagRouter.post('/hashtags', async (req, res) => {
  try {
    const hashtag = new Hashtag(req.body);
    await hashtag.save();
    res.status(200).json({ message: 'hashtag created' });
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

export { hashtagRouter };
