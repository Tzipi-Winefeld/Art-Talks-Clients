function setupSocket(io) {
    io.on('connection', (socket) => {
        console.log('user connected');

        socket.on('message', (message) => {
            io.emit('message', message);
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
}

module.exports = setupSocket; 
