import Task from '../models/Task.model.js';
import Activity from '../models/Activity.model.js';
import mongoose from 'mongoose';

// @desc    Create a task and emit socket event
// @route   POST /api/tasks
export async function createTask(req, res) {
  try {
    const { title, listId, boardId, description } = req.body;
    
    // Create the task
    const task = await Task.create({
      title,
      listId,
      boardId,
      description,
      position: await Task.countDocuments({ listId }) // Append to end
    });

    // Log Activity 
    await Activity.create({
      boardId,
      userId: req.user._id,
      action: `created task: ${title}`
    });

    // Real-time Update
    const io = req.app.get('socketio');
    io.to(boardId).emit('task-created', task);

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// @desc    Update task position (Drag and Drop)
// @route   PATCH /api/tasks/:id/move
export async function moveTask(req, res) {
  try {
    const { newListId, newPosition } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id, 
      { listId: newListId, position: newPosition },
      { new: true }
    );

    // Broadcast the move to all users on the board [cite: 10, 12]
    const io = req.app.get('socketio');
    io.to(task.boardId.toString()).emit('task-moved', {
      taskId: task._id,
      newListId,
      newPosition
    });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


// @desc    Get tasks with search and pagination
// @route   GET /api/tasks/:boardId
export async function getTasks (req, res) {
  const { search, page = 1, limit = 10 } = req.query;
  const boardId1 = new mongoose.Types.ObjectId(req.params.boardId)
  // console.log(boardId1)
  const query = { boardId: boardId1 };

  // console.log(search,query)
  
  if (search) {
    query.title = { $regex: search, $options: 'i' }; // Basic text search
  }
  // console.log(query)
  try {
    const tasks = await Task.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ position: 1 })
      .exec();

    const count = await Task.countDocuments(query);

    res.json({
      tasks,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};