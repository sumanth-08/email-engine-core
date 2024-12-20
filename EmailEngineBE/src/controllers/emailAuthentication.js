import { Router } from "express";
import pca from "../helper/auth.js";
import { send } from "../helper/responseHelper.js";
import { RESPONSE } from "../configs/global.js";
const router = Router();

export default router.get("/", async (req, res) => {
  try {
    const authCodeUrlParameters = {
      scopes: ["Mail.read"],
      redirectUri: "http://localhost:3000/redirect",
    };

    const response = await pca.getAuthCodeUrl(authCodeUrlParameters);
    return send(res, RESPONSE.SUCCESS, response);
  } catch (err) {
    console.log(err);
    return send(res, RESPONSE.UNKNOWN_ERROR);
  }
});
