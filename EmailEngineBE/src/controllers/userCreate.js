import { Router } from "express";
import { send } from "../helper/responseHelper.js";
import { RESPONSE } from "../configs/global.js";
import userIndex from "../models/userIndex.js";
const router = Router();

export default router.post("/", async (req, res) => {
  try {
    return send(res, RESPONSE.SUCCESS);
  } catch (err) {
    return send(res, RESPONSE.UNKNOWN_ERROR);
  }
});

