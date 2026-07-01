import { Router } from 'express';
import ActivityModel from '../models/Activity';

const activitiesRouter = Router();

activitiesRouter.get('/', async (_req, res, next) => {
  try {
    const activities = await ActivityModel.find()
      .sort({ performedAt: -1 })
      .populate('user', 'name email')
      .lean();
    res.json(activities);
  } catch (error) {
    next(error);
  }
});

export default activitiesRouter;