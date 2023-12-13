// Schema
import { tweetSchema as Tweet } from '../schemas';
import { hashtagSchema as Hashtag } from '../schemas';

// Utils
import { extractHashtags } from '../utils';

// Types
import { Request, Response } from 'express';

// GET all tweets
export const getTweets = async (req: Request, res: Response) => {
  const users = (req.query.users as string) || '';

  try {
    const tweets =
      users.length === 0
        ? await Tweet.find().sort({ _id: -1 }).populate('author')
        : await Tweet.find({ author: users.split(' ') })
            .sort({ _id: -1 })
            .populate('author');
    res.json(tweets);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

/// GET tweet by ID
export const getTweetById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const tweet = await Tweet.findById(id);
    res.json(tweet);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

// POST new tweet
export const postTweet = async (req: Request, res: Response) => {
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
};
