import { Router } from 'express';

// Schema
import { tweetSchema as Tweet } from '../schemas';

const tweetRouter = Router();

// GET all tweets
tweetRouter.get('/tweets', async (req, res) => {
  try {
    const tweets = await Tweet.find();
    res.json(tweets);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

// GET tweet by ID
tweetRouter.get('/tweets/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const tweet = await Tweet.findById(id);
    res.json(tweet);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

// POST new tweet
tweetRouter.post('/tweets', async (req, res) => {
  try {
    const tweet = new Tweet(req.body);
    await tweet.save();
    res.status(200).json({ message: 'tweet created' });
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

export { tweetRouter };
