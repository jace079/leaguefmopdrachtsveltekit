import { sveltekit } from '@sveltejs/kit/vite';
import { Server } from 'socket.io';
import { setIo } from './src/lib/store.js';

function socketIoPlugin() {
  return {
    name: 'socket-io',
    configureServer(server) {
      const io = new Server(server.httpServer);
      setIo(io);
    }
  };
}

export default {
  plugins: [sveltekit(), socketIoPlugin()]
};
