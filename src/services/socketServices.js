 const socketService = (io) => {
  io.on('connection', (socket) => {
    
    // 1. Join a Board (Room)
    socket.on('join-board', (boardId) => {
      socket.join(boardId);
    });

    // 2. Handle Task Moves (Broadcast to others in the same room)
    socket.on('task-moved', (data) => {
      // Data includes boardId, taskId, and newPosition
      socket.to(data.boardId).emit('task-updated', data);
    });

    // 3. Activity Feed Updates
    socket.on('new-activity', (data) => {
      socket.to(data.boardId).emit('activity-broadcast', data);
    });

    socket.on('disconnect', () => {
      // Clean up if necessary
    });
  });
};


export default socketService;