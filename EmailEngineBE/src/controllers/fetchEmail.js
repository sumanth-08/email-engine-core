import { Router } from "express";
import { send } from "../helper/responseHelper.js";
import { RESPONSE } from "../configs/global.js";
import emailAuth from "../helper/auth.js";
import axios from "axios";
import pca from "../helper/auth.js";
const router = Router();

export default router.get("/", async (req, res) => {
  try {
    // const { email } = req.body;
    // const token = await emailAuth.getToken(emailAuth.tokenRequest);
    // // console.log(token);

    // const url = `${emailAuth.apiConfig.uri}/me/messages`;

    // // console.log(url);
    // // console.log(token.accessToken);

    // let data = await fetch(url, {
    //   method: "GET",
    //   headers: {
    //     Authorization: `Bearer ${token.accessToken}`,
    //   },
    // });

    // data = await data.json();
    // console.log(data);

    const auth = await pca.acquireTokenByAuthorizationCode({
      scopes: ["Mail.Read"],
      redirectUri: "http://localhost:3000/redirect",
      code: req.query.code,
    });

    const userId = "sumanths2333@outlook.com";

    let data = await fetch(`https://graph.microsoft.com/v1.0/me/messages`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    console.log(await data.json());

    return send(res, RESPONSE.SUCCESS, auth);
  } catch (err) {
    console.log(err);
    return send(res, RESPONSE.UNKNOWN_ERROR);
  }
});
