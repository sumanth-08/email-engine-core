import { Router } from "express";
import { send } from "../helper/responseHelper.js";
import { RESPONSE } from "../configs/global.js";
import axios from "axios";
import getDBConnections from "../helper/dbConnection.js";
// import { getToken, refreshAccessToken } from "../helper/tokenService.js";
import pca from "../helper/auth.js";
const router = Router();

export default router.get("/", async (req, res) => {
  try {
    let token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;
    // const userId = req.query.user_id;
    // let token = await getToken(userId);

    // if (new Date(token.tokenExpiry) < new Date()) {
    //   console.log("Token expired, refreshing...");
    //   token = await refreshAccessToken(userId);
    // }

    const account = await pca.getAllAccounts();
    // console.log("acc", account);

    if (account.length > 0) {
      const firstAccount = account[0];
      let ats = await pca.acquireTokenSilent({
        account: firstAccount,
        scopes: ["User.Read", "Mail.Read"],
      });
      // console.log(ats.accessToken);
      token = ats.accessToken;
    }

    // console.log(token);

    let config = {
      method: "GET",
      maxBodyLength: Infinity,
      url: process.env.GRAPH_ENDPOINT,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    let { data } = await axios.request(config);


    return send(res, RESPONSE.SUCCESS, data);
  } catch (err) {
    console.log(err);
    return send(res, RESPONSE.UNKNOWN_ERROR);
  }
});
