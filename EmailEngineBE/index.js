import express from "express";
import "dotenv/config";
import getDBConnections from "./src/helper/dbConnection.js";
import routes from "./routes.js";
const app = express();
const port = process.env.PORT;

getDBConnections();
routes(app);

app.listen(port, () => {
  console.log(`Server listening on the port ${port}`);
});
