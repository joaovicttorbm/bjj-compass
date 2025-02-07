import { Schema, model } from 'mongoose';

const trainingSchema = new Schema({
    date: { type: Date, default: Date.now },
    techniques: [String],
    durationMinutes: { type: Number, required: true },
    intensityLevel: { type: String, enum: ['low', 'medium', 'high'], required: true },
    notes: String,
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  });
  
  const trainingModel = model('Training', trainingSchema);
  export default trainingModel;