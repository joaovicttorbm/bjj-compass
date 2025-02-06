import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  goals: [{ type: Schema.Types.ObjectId, ref: 'Goal' }],
  trainings: [{ type: Schema.Types.ObjectId, ref: 'Training' }]
});

const userModel = model('User', userSchema);
export default userModel
