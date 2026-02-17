
// const mongoose = require('mongoose');

import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema({
  boardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true }, // e.g., "created task", "moved list"
  details: { type: String },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Activity', ActivitySchema);