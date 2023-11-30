import { Router } from 'express';

// Schema
import { trendSchema as Trend } from '../schemas';

const trendRouter = Router();

// GET all trends
trendRouter.get('/trends', async (req, res) => {
  console.log("primer paso");
  try {
    const trends = await Trend.find();
    res.json(trends);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

// GET trend by ID
trendRouter.get('/trends/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const trend = await Trend.findById(id);
    res.json(trend);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

// POST new trend
trendRouter.post('/trends', async (req, res) => {
  try {
    const trend = new Trend(req.body);
    await trend.save();
    res.status(200).json({ message: 'trend created' });
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

export { trendRouter };
