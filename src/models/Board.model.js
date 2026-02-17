import { Schema, model } from 'mongoose';

const BoardSchema = new Schema({
  title: { type: String, required: true, trim: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

export default model('Board', BoardSchema);