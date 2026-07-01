import { InferSchemaType, Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    motto: { type: String, required: true, trim: true },
    captain: { type: String, required: true, trim: true },
    memberCount: { type: Number, default: 0, min: 0 },
  },
  {
    timestamps: true,
    collection: 'teams',
  },
);

export type Team = InferSchemaType<typeof teamSchema>;

const TeamModel = model<Team>('Team', teamSchema);

export default TeamModel;