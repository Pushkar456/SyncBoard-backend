import mongoose from 'mongoose';

const ListSchema = new mongoose.Schema({
  boardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true },
  title: { type: String, required: true },
  position: { type: Number, default: 0 } // Used for sorting lists on the board
});

// Index for faster queries when loading a board
ListSchema.index({ boardId: 1, position: 1 });

export default mongoose.model('List', ListSchema);