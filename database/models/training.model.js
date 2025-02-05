import { Schema, model } from 'mongoose';

const trainingSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    techniques: [String],
    durationMinutes: { type: Number, required: true },
    intensityLevel: { type: String, enum: ['low', 'medium', 'high'], required: true },
    notes: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  });
  
  module.exports = mongoose.model('Training', trainingSchema);
  