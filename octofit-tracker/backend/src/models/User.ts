import { InferSchemaType, Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    fitnessLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
  },
  {
    timestamps: true,
    collection: 'users',
  },
);

export type User = InferSchemaType<typeof userSchema>;

const UserModel = model<User>('User', userSchema);

export default UserModel;