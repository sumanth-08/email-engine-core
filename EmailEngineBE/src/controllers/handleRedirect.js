import { Router } from "express";
import pca from "../helper/auth.js";
import { send, setErrorResponseMsg } from "../helper/responseHelper.js";
import { RESPONSE } from "../configs/global.js";
import getDBConnections from "../helper/dbConnection.js";
import { getRefreshToken } from "../helper/tokenService.js";
import jwt from "jsonwebtoken";
const router = Router();

export default router.get("/", async (req, res) => {
  try {
    const code = req.query.code;

    if (!code || code === undefined) {
      return send(res, setErrorResponseMsg(RESPONSE.REQUIRED, "Code"));
    }

    // const tokenRequest = {
    //   code: code,
    //   scopes: ["Mail.Read", "User.Read", "offline_access"],
    //   redirectUri: "http://localhost:3000/redirect",
    // };

    // const data = await pca.acquireTokenByCode(tokenRequest);
    // console.log(data);
    // console.log(data.refreshOn);

    const data = await getRefreshToken(code);
    // console.log(data);

    const decodeToken = jwt.decode(data.id_token);
    const userId = decodeToken.sub;
    let tokenExpireTime = new Date(Date.now() + data.expires_in * 1000).toISOString();

    const esClient = await getDBConnections();
    await esClient.index({
      index: "usertokens",
      document: {
        userid: userId,
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        tokenExpiry: tokenExpireTime,
      },
    });

    return send(res, RESPONSE.SUCCESS, data);
  } catch (err) {
    +console.log(err);
    return send(res, RESPONSE.UNKNOWN_ERROR);
  }
});
