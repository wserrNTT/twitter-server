import express from 'express';

// Middlewaes
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';

// Environment variables
import dotenv from 'dotenv';
dotenv.config();

import { userRouter } from './routes/user.routes';
import { hashtagRouter } from './routes/hashtag.routes';
import { tweetRouter } from './routes/tweet.routes';
import { actionRouter } from './routes/action.routes';

// DB connection
mongoose
  .connect(process.env.MONGODB_URI || '', {})
  .then(() => console.log('Connected to Database'));

// Settings
const app = express();
const port = process.env.PORT || 3000;

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    // origin: '*'
    origin: 'http://localhost:5173'
  })
);

// Routes
app.use('/', actionRouter);

app.use('/api', userRouter);
app.use('/api', tweetRouter);
app.use('/api', hashtagRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`http://localhost:${port}`);
});
