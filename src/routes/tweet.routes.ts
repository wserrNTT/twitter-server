import { Router } from 'express';

// Controller
import { getTweetById, getTweets, postTweet } from '../controllers/tweet.controller';

const tweetRouter = Router();

// GET all tweets
tweetRouter.get('/tweets', getTweets);

// GET tweet by ID
tweetRouter.get('/tweets/:id', getTweetById);

// POST new tweet
tweetRouter.post('/tweets', postTweet);

export { tweetRouter };
