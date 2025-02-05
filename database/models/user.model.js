import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  goals: [{ type: Schema.Types.ObjectId, ref: 'Goal' }],
  trainings: [{ type: Schema.Types.ObjectId, ref: 'Training' }]
});

export default model('User', userSchema);
