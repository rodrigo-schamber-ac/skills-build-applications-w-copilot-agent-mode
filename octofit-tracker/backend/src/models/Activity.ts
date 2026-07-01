import { InferSchemaType, Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['run', 'cycling', 'strength', 'yoga', 'swim', 'hiit'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 1 },
    performedAt: { type: Date, required: true },
  },
  {
    timestamps: true,
    collection: 'activities',
  },
);

export type Activity = InferSchemaType<typeof activitySchema>;

const ActivityModel = model<Activity>('Activity', activitySchema);

export default ActivityModel;