"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Activity_1 = __importDefault(require("../models/Activity"));
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const Team_1 = __importDefault(require("../models/Team"));
const User_1 = __importDefault(require("../models/User"));
const Workout_1 = __importDefault(require("../models/Workout"));
const mongoUri = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
const seed = async () => {
    // Seed the octofit_db database with test data
    console.log('Seed the octofit_db database with test data');
    await mongoose_1.default.connect(mongoUri);
    await Promise.all([
        Team_1.default.deleteMany({}),
        User_1.default.deleteMany({}),
        Activity_1.default.deleteMany({}),
        Leaderboard_1.default.deleteMany({}),
        Workout_1.default.deleteMany({}),
    ]);
    const teams = await Team_1.default.insertMany([
        {
            name: 'Stride Syndicate',
            city: 'Austin',
            motto: 'Consistency Beats Intensity',
            captain: 'Maya Patel',
            memberCount: 4,
        },
        {
            name: 'Iron Orbit',
            city: 'Seattle',
            motto: 'Lift Smart, Recover Hard',
            captain: 'Jordan Kim',
            memberCount: 4,
        },
    ]);
    const users = await User_1.default.insertMany([
        {
            name: 'Maya Patel',
            email: 'maya.patel@octofit.dev',
            fitnessLevel: 'advanced',
            team: teams[0]._id,
        },
        {
            name: 'Leo Martinez',
            email: 'leo.martinez@octofit.dev',
            fitnessLevel: 'intermediate',
            team: teams[0]._id,
        },
        {
            name: 'Jordan Kim',
            email: 'jordan.kim@octofit.dev',
            fitnessLevel: 'advanced',
            team: teams[1]._id,
        },
        {
            name: 'Nina Alvarez',
            email: 'nina.alvarez@octofit.dev',
            fitnessLevel: 'beginner',
            team: teams[1]._id,
        },
    ]);
    await Activity_1.default.insertMany([
        {
            user: users[0]._id,
            type: 'run',
            durationMinutes: 42,
            caloriesBurned: 520,
            performedAt: new Date('2026-06-25T06:15:00.000Z'),
        },
        {
            user: users[1]._id,
            type: 'cycling',
            durationMinutes: 55,
            caloriesBurned: 610,
            performedAt: new Date('2026-06-25T17:40:00.000Z'),
        },
        {
            user: users[2]._id,
            type: 'strength',
            durationMinutes: 48,
            caloriesBurned: 430,
            performedAt: new Date('2026-06-26T12:00:00.000Z'),
        },
        {
            user: users[3]._id,
            type: 'yoga',
            durationMinutes: 35,
            caloriesBurned: 210,
            performedAt: new Date('2026-06-26T19:30:00.000Z'),
        },
    ]);
    await Leaderboard_1.default.insertMany([
        {
            user: users[2]._id,
            points: 1480,
            rank: 1,
            period: '2026-W26',
        },
        {
            user: users[0]._id,
            points: 1410,
            rank: 2,
            period: '2026-W26',
        },
        {
            user: users[1]._id,
            points: 1260,
            rank: 3,
            period: '2026-W26',
        },
        {
            user: users[3]._id,
            points: 980,
            rank: 4,
            period: '2026-W26',
        },
    ]);
    await Workout_1.default.insertMany([
        {
            title: 'Foundation Full Body',
            difficulty: 'beginner',
            durationMinutes: 30,
            targetMuscles: ['legs', 'core', 'shoulders'],
            equipment: ['dumbbells', 'mat'],
        },
        {
            title: 'Tempo Runner Boost',
            difficulty: 'intermediate',
            durationMinutes: 40,
            targetMuscles: ['hamstrings', 'glutes', 'core'],
            equipment: ['treadmill'],
        },
        {
            title: 'Power Circuit Elite',
            difficulty: 'advanced',
            durationMinutes: 50,
            targetMuscles: ['chest', 'back', 'legs'],
            equipment: ['barbell', 'kettlebell', 'bench'],
        },
    ]);
    console.log('Seed complete: users, teams, activities, leaderboard, workouts inserted.');
};
void seed()
    .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
})
    .finally(async () => {
    await mongoose_1.default.connection.close();
});
