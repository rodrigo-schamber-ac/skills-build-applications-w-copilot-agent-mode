"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const leaderboardRouter = (0, express_1.Router)();
leaderboardRouter.get('/', async (_req, res, next) => {
    try {
        const leaderboard = await Leaderboard_1.default.find()
            .sort({ rank: 1 })
            .populate('user', 'name fitnessLevel')
            .lean();
        res.json(leaderboard);
    }
    catch (error) {
        next(error);
    }
});
exports.default = leaderboardRouter;
