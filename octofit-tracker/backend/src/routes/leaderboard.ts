import { Router } from 'express';
import LeaderboardModel from '../models/Leaderboard';

const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_req, res, next) => {
  try {
    const leaderboard = await LeaderboardModel.find()
      .sort({ rank: 1 })
      .populate('user', 'name fitnessLevel')
      .lean();
    res.json(leaderboard);
  } catch (error) {
    next(error);
  }
});

export default leaderboardRouter;