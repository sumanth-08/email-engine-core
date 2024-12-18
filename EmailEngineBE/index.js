import express from "express";
import "dotenv/config";
import getDBConnections from "./src/helper/dbConnection.js";
import routes from "./routes.js";
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
getDBConnections();
routes(app);

app.listen(port, () => {
  console.log(`Server listening on the port ${port}`);
});
