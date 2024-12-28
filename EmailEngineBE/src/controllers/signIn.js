import { Router } from "express";
import { send, setErrorResponseMsg } from "../helper/responseHelper.js";
import { RESPONSE } from "../configs/global.js";
import getDBConnections from "../helper/dbConnection.js";
import bcrypt from "bcrypt";
import { emailRegex, passwordRegex } from "../configs/constants.js";
import jwt from "jsonwebtoken";
const router = Router();

export default router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const elasticClient = await getDBConnections();

    const emailPattern = String(email).match(emailRegex);
    if (!emailPattern || emailPattern.length <= 0 || email.indexOf(" ") >= 0) {
      return send(res, setErrorResponseMsg(RESPONSE.INVALID, "Email"));
    }
    const pwdPattern = String(password).match(passwordRegex);
    if (!pwdPattern || pwdPattern.length <= 0 || password.indexOf(" ") >= 0) {
      return send(res, setErrorResponseMsg(RESPONSE.INVALID, "Password"));
    }

    let userData = await elasticClient.search({
      index: "users",
      query: {
        term: { "email.keyword": email },
      },
    });

    // console.log(userData);

    if (userData.hits.total.value > 0 && (await bcrypt.compare(password, userData.hits.hits[0]._source.password))) {
      const token = jwt.sign(
        {
          id: userData.hits.hits[0]._source.id,
          name: userData.hits.hits[0]._source.name,
          email: userData.hits.hits[0]._source.email,
        },
        process.env.JWT_TOKENKEY
      );

      return send(res, RESPONSE.SUCCESS, {
        access_token: token,
      });
    } else {
      return send(res, setErrorResponseMsg(RESPONSE.NOT_FOUND, "Email/Password"));
    }
  } catch (err) {
    console.log(err.message);
    return send(res, RESPONSE.UNKNOWN_ERROR);
  }
});
