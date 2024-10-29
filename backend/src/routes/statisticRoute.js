import express from 'express';
import { Statistics } from '../models/statisticModel.js';

const statsRouter = express.Router();

statsRouter.get('/api/statistics', async (req, res) => {
   try {
      const stats = await Statistics.findOne({});
      res.json(stats);
   } catch (error) {
      res.status(500).json({ message: 'Error fetching statistics' });
   }
});

export default statsRouter;
