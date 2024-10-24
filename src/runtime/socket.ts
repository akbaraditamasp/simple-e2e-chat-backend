import jwt from "jsonwebtoken";
import socket from "../modules/socket.js";
import db from "../modules/db.js";

socket().use(async (conn, next) => {
  try {
    const { token } = conn.handshake?.auth || {};

    const { cuid } = jwt.verify(token, process.env.JWT_SECRET!) as {
      cuid: string;
    };

    socket.connectedUsers.push({
      socket: conn,
      socketId: conn.id,
      cuid,
    });

    socket()
      .to(`user:info:${cuid}`)
      .emit("conversationInfo", {
        ...db().data.users.find((el) => el.cuid === cuid),
        isOnline: true,
      });

    next();
  } catch (e) {
    console.log(e);

    next(new Error("Unauthorized"));
  }
});

socket().on("connection", (conn) => {
  conn.on("get:sync", async () => {
    const connected = socket.connectedUsers.find(
      (el) => el.socketId === conn.id
    );

    for (const [index, chat] of db()
      .data.pending.filter((el) => el.cuid === connected?.cuid)
      .entries()) {
      conn.emit("chat", chat);
      db().data.pending.splice(index, 1);

      await db().write();
    }
  });

  conn.on("disconnect", () => {
    const connected = socket.connectedUsers.findIndex(
      (el) => el.socketId === conn.id
    );
    const cuid = socket.connectedUsers[connected].cuid;

    socket()
      .to(`user:info:${cuid}`)
      .emit("conversationInfo", {
        ...db().data.users.find((el) => el.cuid === cuid),
        isOnline: false,
      });

    if (connected >= 0) socket.connectedUsers.splice(connected, 1);
  });

  conn.on("user:info", ({ cuid }) => {
    const user = db().data.users.find((el) => el.cuid === cuid);

    if (!user) return;

    conn.join(`user:info:${cuid}`);
    conn.emit("conversationInfo", {
      ...user,
      isOnline: Boolean(socket.connectedUsers.find((el) => el.cuid === cuid)),
    });
  });

  conn.on("leave:user:info", ({ cuid }) => {
    const user = db().data.users.find((el) => el.cuid === cuid);

    if (!user) return;

    conn.leave(`user:info:${cuid}`);
  });
});
