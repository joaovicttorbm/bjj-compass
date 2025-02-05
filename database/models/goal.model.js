import { Schema, model } from 'mongoose';

const goalSchema = new mongoose.Schema({
    description: { type: String, required: true },
    status: { type: String, enum: ['in_progress', 'completed', 'abandoned'], default: 'in_progress' },
    progress: { type: Number, default: 0 },
    notifications: { type: Boolean, default: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  });
  
export default mongoose.model('Goal', goalSchema);
  