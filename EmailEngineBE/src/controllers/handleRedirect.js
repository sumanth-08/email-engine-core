import { Router } from "express";
import pca from "../helper/auth.js";
import { send } from "../helper/responseHelper.js";
import { RESPONSE } from "../configs/global.js";
const router = Router();

export default router.get("/", async (req, res) => {
  try {
    // You can also build the tokenRequest object directly in the JavaScript file like this
    const tokenRequest = {
      // The URL from the redirect will contain the Auth Code in the query parameters
      code: req.query.code,
      scopes: ["Mail.read"],
      redirectUri: "http://localhost:3000/redirect",
    };

    // Pass the tokenRequest object with the Auth Code, scopes and redirectUri to acquireTokenByCode API
    let response = pca.acquireTokenByCode(tokenRequest);
    return send(res, RESPONSE.SUCCESS, response);
  } catch (err) {
    console.log(err);
    return send(res, RESPONSE.UNKNOWN_ERROR);
  }
});
