import http from 'http';
import { Server } from 'socket.io';
import Machines from '../machine';
import { Duplex } from 'stream';
import { Image } from '../domain';
const ss = require('@sap_oss/node-socketio-stream');
const httpServer = http.createServer();
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:9900',
    methods: ['GET', 'PUT', 'POST'],
  },
});

io.on('connect', (socket) => {
  ss(socket).on('connectMachine', async (stream: Duplex, args: { image: Image }) => {
    if (stream) {
      const res = await Machines.connect(args, stream, () => {
        socket.disconnect();
      })();
      switch (res._tag) {
        case 'Left':
          // Todo
          console.error(`failed to connect to machine`);
          socket.disconnect();
      }
    }
  });
});

export default httpServer;
