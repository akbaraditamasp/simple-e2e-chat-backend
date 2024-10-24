import { Server, Socket } from "socket.io";
import http from "./http.js";

function socket() {
  let connectedUsers: { socket: Socket; socketId: string; cuid: string }[] = [];
  let socket: Server;

  const boot = () => {
    socket = new Server(http(), {
      cors: {
        origin: "*",
      },
    });
  };

  return Object.assign(() => socket, { boot, connectedUsers });
}

export default socket();
