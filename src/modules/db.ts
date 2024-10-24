import { JSONFilePreset } from "lowdb/node";
import User from "../types/user.js";
import { Low } from "lowdb";
import { resolve } from "path";
import Chat from "../types/chat.js";

type DB = {
  users: User[];
  pending: Chat[];
};

function db() {
  let db: Low<DB>;

  const boot = async () => {
    db = await JSONFilePreset<DB>(resolve("db.json"), {
      users: [],
      pending: [],
    });
  };

  return Object.assign(() => db, { boot });
}

export default db();
