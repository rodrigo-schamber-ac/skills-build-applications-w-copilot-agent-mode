"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const teams_1 = __importDefault(require("./routes/teams"));
const users_1 = __importDefault(require("./routes/users"));
const workouts_1 = __importDefault(require("./routes/workouts"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT ?? 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        service: 'octofit-tracker-backend',
        port,
        baseUrl,
        mongo: {
            target: database_1.mongoUri,
            connected: (0, database_1.isDatabaseConnected)(),
        },
    });
});
app.use((error, _req, res, _next) => {
    console.error('Unhandled route error:', error);
    res.status(500).json({
        message: 'Internal server error',
    });
});
const start = async () => {
    try {
        await (0, database_1.connectDatabase)();
        console.log(`MongoDB connected: ${database_1.mongoUri}`);
    }
    catch (error) {
        console.error('MongoDB connection failed:', error);
    }
    app.listen(port, () => {
        console.log(`API listening on ${baseUrl}`);
    });
};
void start();
