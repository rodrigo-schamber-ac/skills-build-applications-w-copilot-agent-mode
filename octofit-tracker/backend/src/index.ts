import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import teamsRouter from './routes/teams';
import usersRouter from './routes/users';
import workoutsRouter from './routes/workouts';

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 8000);
const mongoUri = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'octofit-tracker-backend',
    port,
    baseUrl,
    mongo: {
      target: mongoUri,
      connected: mongoose.connection.readyState === 1,
    },
  });
});

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled route error:', error);
  res.status(500).json({
    message: 'Internal server error',
  });
});

const start = async (): Promise<void> => {
  try {
    await mongoose.connect(mongoUri);
    console.log(`MongoDB connected: ${mongoUri}`);
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }

  app.listen(port, () => {
    console.log(`API listening on ${baseUrl}`);
  });
};

void start();