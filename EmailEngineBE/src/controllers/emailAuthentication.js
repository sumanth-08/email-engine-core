import { Router } from "express";
import pca from "../helper/auth.js";
import { send } from "../helper/responseHelper.js";
import { RESPONSE } from "../configs/global.js";
const router = Router();

export default router.get("/", async (req, res) => {
  try {
    const authCodeUrlParameters = {
      scopes: ["Mail.Read", "User.Read", "offline_access"],
      redirectUri: process.env.REDIRECT_URL,
    };

    const response = await pca.getAuthCodeUrl(authCodeUrlParameters);
    return send(res, RESPONSE.SUCCESS, response);
  } catch (err) {
    console.log(err);
    return send(res, RESPONSE.UNKNOWN_ERROR);
  }
});
