import Activity from '../models/Activity.model.js';

// @desc    Get board activity history (Paginated) 
// @route   GET /api/activity/:boardId
export async function getActivity(req, res) {
  const { page = 1, limit = 20 } = req.query;
  try {
    const history = await Activity.find({ boardId: req.params.boardId })
      .populate('userId', 'username')
      .sort({ timestamp: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}