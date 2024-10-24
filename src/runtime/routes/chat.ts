import { Router } from "express";
import checkToken from "../../handlers/auth/check-token.js";
import findUser from "../../handlers/chat/find-user.js";
import findPublicKey from "../../handlers/chat/find-public-key.js";
import send from "../../handlers/chat/send.js";

const chat = Router();
chat.use(checkToken);

chat.get("/key/:cuid", findPublicKey);
chat.get("/find", findUser);
chat.post("/:cuid", send);

export default chat;
