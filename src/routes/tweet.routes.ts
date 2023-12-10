import { Router } from 'express';

// Schema
import { tweetSchema as Tweet } from '../schemas';
import { userSchema as User } from '../schemas';
import { hashtagSchema as Hashtag } from '../schemas';

import { extractHashtags } from '../utils';

const tweetRouter = Router();

// GET all tweets
tweetRouter.get('/tweets', async (req, res) => {
  try {
    const tweets = await Tweet.find().sort({ _id: -1 }).populate('author');
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

// GET tweets by user ID
tweetRouter.get('/users/:id/tweets/', async (req, res) => {
  const { id } = req.params;
  try {
    const tweets = await Tweet.find({ author: id });
    res.json(tweets);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

// POST new tweet
tweetRouter.post('/tweets', async (req, res) => {
  try {
    const tweet = new Tweet(req.body);
    await tweet.save();

    //gets hashtags from body
    const hashtags = extractHashtags(tweet.body);

    // adds hashtag to DB if it's new
    for (const hashtag of hashtags) {
      const ocurrence = await Hashtag.findOne({ name: hashtag });

      if (ocurrence) {
        ocurrence.tweet_volume = [...ocurrence.tweet_volume, tweet._id];
        await ocurrence.save();
      } else {
        const newHashtag = new Hashtag({ name: hashtag, tweet_volume: [tweet._id] });
        newHashtag.save();
      }
    }

    res.status(200).json({ message: 'tweet created' });
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

export { tweetRouter };
