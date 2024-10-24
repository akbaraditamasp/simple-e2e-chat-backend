import bodyParser from "body-parser";
import notFound from "../handlers/errors/not-found.js";
import validation from "../handlers/errors/validation.js";
import app from "../modules/app.js";
import auth from "./routes/auth.js";
import internalError from "../handlers/errors/internal-error.js";
import cors from "cors";
import chat from "./routes/chat.js";

app().use(cors());
app().use(bodyParser.json());

app().use("/auth", auth);
app().use("/chat", chat);

app().use(validation);
app().use(internalError);
app().use(notFound);
