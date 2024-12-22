import { Router } from "express";
import pca from "../helper/auth.js";
import { send } from "../helper/responseHelper.js";
import { RESPONSE } from "../configs/global.js";
const router = Router();

export default router.get("/", async (req, res) => {
  try {

    const tokenRequest = {
      // The URL from the redirect will contain the Auth Code in the query parameters
      code: "M.C510_BAY.2.U.3938cab8-ca54-d582-d3ac-b014cfe37e8d",
      scopes: ['Mail.Read', 'User.Read'],
      redirectUri: "http://localhost:3000/redirect",
  };

  // Pass the tokenRequest object with the Auth Code, scopes and redirectUri to acquireTokenByCode API
  pca.acquireTokenByCode(tokenRequest).then((response) => {
      console.log("\nResponse: \n:", response);
      return send(res, RESPONSE.SUCCESS, response)
  }).catch((error) => {
      console.log(error);
      return send(res, RESPONSE.UNKNOWN_ERROR, error)
  });
  } catch (err) {
    console.log(err);
    return send(res, RESPONSE.UNKNOWN_ERROR);
  }
});
