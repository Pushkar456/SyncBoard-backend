import mongoose from 'mongoose';


const TaskSchema = new mongoose.Schema({
  listId: { type: mongoose.Schema.Types.ObjectId, ref: 'List', required: true },
  boardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true }, // Redundant but helps performance
  title: { type: String, required: true, index: 'text' }, // Text index for search functionality
  description: { type: String },
  assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  position: { type: Number, default: 0 },
  dueDate: { type: Date },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' }
}, { timestamps: true });

// Index for drag-and-drop performance across lists
TaskSchema.index({ listId: 1, position: 1 });

export default mongoose.model('Task', TaskSchema);