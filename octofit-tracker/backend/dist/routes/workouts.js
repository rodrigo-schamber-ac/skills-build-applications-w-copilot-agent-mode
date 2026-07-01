"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Workout_1 = __importDefault(require("../models/Workout"));
const workoutsRouter = (0, express_1.Router)();
workoutsRouter.get('/', async (_req, res, next) => {
    try {
        const workouts = await Workout_1.default.find().lean();
        res.json(workouts);
    }
    catch (error) {
        next(error);
    }
});
exports.default = workoutsRouter;
