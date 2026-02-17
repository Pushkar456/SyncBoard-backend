import mongoose from 'mongoose';
import List from '../models/List.model.js';
import Task from '../models/Task.model.js';

// @desc    Create a new list on a board
// @route   POST /api/lists
export async function createList(req, res) {
  try {
    const { title, boardId } = req.body;

    // Calculate position: find the highest current position and add 1
    const lastList = await List.findOne({ boardId }).sort('-position');
    const position = lastList ? lastList.position + 1 : 0;

    const list = await List.create({
      title,
      boardId,
      position
    });

    res.status(201).json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// @desc    Get all lists for a specific board
// @route   GET /api/lists/:boardId
export async function getListsByBoard(req, res) {
  try {
    // console.log(req.params.boardId);
    const boardId1 = new mongoose.Types.ObjectId(req.params.boardId);
    
    // console.log(boardId1);

    const lists = await List.find({boardId: boardId1}).sort('position');
    // console.log(lists)

    res.json(lists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// @desc    Delete a list and all tasks inside it
// @route   DELETE /api/lists/:id
export async function deleteList(req, res) {
  try {
    const list = await List.findById(req.params.id);
    if (!list) return res.status(404).json({ message: 'List not found' });

    // Remove all tasks associated with this list
    await Task.deleteMany({ listId: req.params.id });
    
    // Remove the list itself
    await list.deleteOne();

    res.json({ message: 'List and associated tasks removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// @desc    Update list title or position
// @route   PATCH /api/lists/:id
export async function updateList(req, res) {
  try {
    const { title, position } = req.body;
    const list = await List.findByIdAndUpdate(
      req.params.id,
      { title, position },
      { new: true }
    );
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}