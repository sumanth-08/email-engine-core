import express from "express";
import userCreate from "./src/controllers/userCreate.js";
import userlist from "./src/controllers/userlist.js";
import fetchEmail from "./src/controllers/fetchEmail.js";

const routes = (app) => {
  app.use(express.json());
  app.use("/api/create/user", userCreate)
  app.use("/api/list/user", userlist)
  app.use("/api/fetch/email", fetchEmail)
};

export default routes;