import express from "express";
import userCreate from "./src/controllers/userCreate.js";
import userlist from "./src/controllers/userlist.js";

const routes = (app) => {
  app.use(express.json());
  app.use("/api/create/user", userCreate)
  app.use("/api/list/user", userlist)
};

export default routes;