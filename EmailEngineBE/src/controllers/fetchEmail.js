import { Router } from "express";
import { send } from "../helper/responseHelper.js";
import { RESPONSE } from "../configs/global.js";
import emailAuth from "../helper/auth.js";
import axios from "axios";
const router = Router();

export default router.get("/", async (req, res) => {
  try {
    const { email } = req.body;
    const token = await emailAuth.getToken(emailAuth.tokenRequest);
    // console.log(token);

    const url = `${emailAuth.apiConfig.uri}/me/messages`;

    // console.log(url);
    // console.log(token.accessToken);

    let data = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    });

    data = await data.json();
    console.log(data);

    return send(res, RESPONSE.SUCCESS, data);
  } catch (err) {
    console.log(err);
    return send(res, RESPONSE.UNKNOWN_ERROR);
  }
});
