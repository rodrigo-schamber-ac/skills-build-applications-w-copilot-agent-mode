"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    motto: { type: String, required: true, trim: true },
    captain: { type: String, required: true, trim: true },
    memberCount: { type: Number, default: 0, min: 0 },
}, {
    timestamps: true,
    collection: 'teams',
});
const TeamModel = (0, mongoose_1.model)('Team', teamSchema);
exports.default = TeamModel;
