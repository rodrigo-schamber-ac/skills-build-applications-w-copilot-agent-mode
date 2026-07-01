import { Router } from 'express';
import UserModel from '../models/User';

const usersRouter = Router();

usersRouter.get('/', async (_req, res, next) => {
  try {
    const users = await UserModel.find().populate('team', 'name city').lean();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

export default usersRouter;