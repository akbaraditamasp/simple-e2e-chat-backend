import express from "express";

function app() {
  const app = express();

  return () => app;
}

export default app();
