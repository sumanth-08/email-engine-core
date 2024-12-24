import { Router } from "express";
import pca from "../helper/auth.js";
import { send, setErrorResponseMsg } from "../helper/responseHelper.js";
import { RESPONSE } from "../configs/global.js";
const router = Router();

export default router.get("/", async (req, res) => {
  try {
    const code = req.query.code;

    if (!code || code === undefined) {
      return send(res, setErrorResponseMsg(RESPONSE.REQUIRED, "Code"));
    }

    const tokenRequest = {
      code: code,
      scopes: ["Mail.Read", "User.Read", "offline_access"],
      redirectUri: "http://localhost:3000/redirect",
    };

    const data = await pca.acquireTokenByCode(tokenRequest);
    console.log(data);
    console.log(data.refreshToken);

    // await saveToken(data.account.homeAccountId, {
    //   accessToken: data.accessToken,
    //   refreshToken: data.refreshToken,
    //   tokenExpiry: new Date(Date.now() + data.expiresOn * 1000).toISOString(),
    // });

    return send(res, RESPONSE.SUCCESS, data);
  } catch (err) {+
    console.log(err);
    return send(res, RESPONSE.UNKNOWN_ERROR);
  }
});
