const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const picturesRouter = require('./routes/pictures');
const setupSocket = require('./socket/socket');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "http://localhost:3000" },
});

app.use(cors());
app.use(express.static('public'));
app.use('/api/pictures', picturesRouter); 

setupSocket(io); 

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});
