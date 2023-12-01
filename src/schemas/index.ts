import { Schema, model } from 'mongoose';

export const userSchema = model(
  'User',
  new Schema({
    userName: { type: String, required: true },
    password: { type: String },
    displayName: { type: String, required: true },
    description: { type: String, required: true },
    profilePicture: { type: String, required: true },
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  })
);

export const tweetSchema = model(
  'Tweet',
  new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    timeStamp: { type: String, required: true },
    body: { type: String, required: true },
    picture: { type: String },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Tweet' }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  })
);

export const hashtagSchema = model(
  'Hashtag',
  new Schema({
    name: { type: String, required: true },
    tweet_volume: [{ type: Schema.Types.ObjectId, ref: 'Tweet' }]
  })
);
