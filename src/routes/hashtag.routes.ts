import { Router } from 'express';

// Controller
import {
  getHashtags,
  getHashtagByName,
  postHashtag
} from '../controllers/hashtag.controller';

const hashtagRouter = Router();

// GET all hashtags
hashtagRouter.get('/hashtags', getHashtags);

// GET hashtag by name
hashtagRouter.get('/hashtags/:name', getHashtagByName);

// POST new hashtag
hashtagRouter.post('/hashtags', postHashtag);

export { hashtagRouter };
