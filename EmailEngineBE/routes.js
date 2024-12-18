import express from "express";
import userCreate from "./src/controllers/userCreate.js";

const routes = (app) => {
  app.use(express.json());
  app.use("/api/create/user", userCreate)
};

export default routes;