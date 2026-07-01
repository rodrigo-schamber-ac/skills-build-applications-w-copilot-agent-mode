import { InferSchemaType, Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    period: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
    collection: 'leaderboard',
  },
);

export type Leaderboard = InferSchemaType<typeof leaderboardSchema>;

const LeaderboardModel = model<Leaderboard>('Leaderboard', leaderboardSchema);

export default LeaderboardModel;