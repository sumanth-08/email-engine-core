import express from "express";
import userCreate from "./src/controllers/userCreate.js";
import fetchEmail from "./src/controllers/fetchEmail.js";
import emailAuthentication from "./src/controllers/emailAuthentication.js";
import handleRedirect from "./src/controllers/handleRedirect.js";
import signIn from "./src/controllers/signIn.js";
import getUserMessages from "./src/controllers/getUserMessages.js";
import getUserMailBox from "./src/controllers/getUserMailBox.js";

const routes = (app) => {
  app.use(express.json());
  app.use("/api/create/user", userCreate);
  app.use("/api/fetch/email", fetchEmail);
  app.use("/api/email/login", emailAuthentication);
  app.use("/api/email/redirect", handleRedirect);
  app.use("/api/user/signin", signIn);
  app.use("/api/user/messages/list", getUserMessages);
  app.use("/api/user/mailbox/list", getUserMailBox);
};

export default routes;
