import { Router } from "express";
import { send } from "../helper/responseHelper.js";
import { RESPONSE } from "../configs/global.js";
import userIndex from "../models/userIndex.js";
import getDBConnections from "../helper/dbConnection.js";
const router = Router();

export default router.post("/", async (req, res) => {
  try {
    const { user_id, email } = req.body;
    const elasticClient = getDBConnections();

    await elasticClient.index({
      index: userIndex.index,
      document: {
        user_id: user_id,
        email_addy: email,
      },
    });

    return send(res, RESPONSE.SUCCESS);
  } catch (err) {
    console.log(err.message);
    
    return send(res, RESPONSE.UNKNOWN_ERROR);
  }
});