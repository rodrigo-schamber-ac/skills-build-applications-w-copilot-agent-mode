"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDatabaseConnected = exports.disconnectDatabase = exports.connectDatabase = exports.mongoUri = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.mongoUri = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
const connectDatabase = async () => {
    await mongoose_1.default.connect(exports.mongoUri);
};
exports.connectDatabase = connectDatabase;
const disconnectDatabase = async () => {
    await mongoose_1.default.connection.close();
};
exports.disconnectDatabase = disconnectDatabase;
const isDatabaseConnected = () => mongoose_1.default.connection.readyState === 1;
exports.isDatabaseConnected = isDatabaseConnected;
