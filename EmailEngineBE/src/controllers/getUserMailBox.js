import {  Router } from "express";
import { send } from "../helper/responseHelper.js";
import { RESPONSE } from "../configs/global.js";
import getDBConnections from "../helper/dbConnection.js";
import { authenticate } from "../middlewares/jwtAuth.js";
const router = Router();

export default router.get("/", authenticate, async (req, res) => {
  try {
    const elasticClient = await getDBConnections();

    let data = await elasticClient.search({
      index: "usermailbox",
      query: {
        term: {
          "user_id.keyword": req.user.id,
        },
      },
    });

    return send(res, RESPONSE.SUCCESS, data.hits);
  } catch (err) {
    console.log(err);
    return send(res, RESPONSE.UNKNOWN_ERROR);
  }
});
