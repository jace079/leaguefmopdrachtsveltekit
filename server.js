import { createServer } from 'http';
import { Server } from 'socket.io';
import { handler } from './build/handler.js';
import { setIo } from './src/lib/store.js';

const server = createServer(handler);
const io = new Server(server);
setIo(io);

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Server running on http://localhost:${port}`));
