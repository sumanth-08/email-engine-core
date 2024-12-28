import { query, Router } from "express";
import { send } from "../helper/responseHelper.js";
import { RESPONSE } from "../configs/global.js";
// import userIndex from "../models/userIndex.js";
import getDBConnections from "../helper/dbConnection.js";
const router = Router();

export default router.get("/", async (req, res) => {
  try {
    const elasticClient = await getDBConnections();

    let data = await elasticClient.search({
      index: "usertokens",
      query: {
        match_all: {},
      },
    });

    return send(res, RESPONSE.SUCCESS, data.hits);
  } catch (err) {
    console.log(err);
    return send(res, RESPONSE.UNKNOWN_ERROR);
  }
});
