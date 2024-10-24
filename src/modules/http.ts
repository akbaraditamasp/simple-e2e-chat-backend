import { RequestListener, Server, createServer } from "http";

function http() {
  let http: Server;

  const boot = (app: RequestListener) => {
    http = createServer(app);
  };

  return Object.assign(() => http, { boot });
}

export default http();
