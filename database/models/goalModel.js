import { Schema, model } from 'mongoose';

const goalSchema = new Schema({
    description: { type: String, required: true },
    status: { type: String, enum: ['in_progress', 'completed', 'abandoned'], default: 'in_progress' },
    progress: { type: Number, default: 0 },
    notifications: { type: Boolean, default: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  });
  
export default model('Goal', goalSchema);
  