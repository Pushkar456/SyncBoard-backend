import Board from '../models/Board.model.js';
import Lists from '../models/List.model.js';

// @desc    Create a new board and default lists
// @route   POST /api/boards
export async function createBoard(req, res) {
  try {
    const { title } = req.body;
    const board = await Board.create({
      title,
      owner: req.user._id, // From auth middleware 
      members: [req.user._id]
    });

    // Automatically create default lists
    
    const defaultLists = ['To Do', 'In Progress', 'Done'];
    const listPromises = defaultLists.map((name, index) => 
      Lists.create({ boardId: board._id, title: name, position: index })
    );
    await Promise.all(listPromises);

    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// @desc    Get all boards for the logged-in user
// @route   GET /api/boards
export async function getMyBoards(req, res) {
  try {
    const boards = await Board.find({ members: req.user._id });
    res.json(boards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}