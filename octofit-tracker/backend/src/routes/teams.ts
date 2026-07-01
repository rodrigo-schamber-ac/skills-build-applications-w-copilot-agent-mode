import { Router } from 'express';
import TeamModel from '../models/Team';

const teamsRouter = Router();

teamsRouter.get('/', async (_req, res, next) => {
  try {
    const teams = await TeamModel.find().lean();
    res.json(teams);
  } catch (error) {
    next(error);
  }
});

export default teamsRouter;