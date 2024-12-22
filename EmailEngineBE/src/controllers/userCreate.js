import { Router } from "express";
import { send, setErrorResponseMsg } from "../helper/responseHelper.js";
import { RESPONSE } from "../configs/global.js";
import getDBConnections from "../helper/dbConnection.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
const router = Router();

export default router.post("/", async (req, res) => {
  try {
    const elasticClient = await getDBConnections();
    let { user_id, name, email, password } = req.body;
    user_id = uuidv4();

    if (!name || name === undefined) {
      return send(res, setErrorResponseMsg(RESPONSE.REQUIRED, "Name"));
    }
    const emailPattern = String(email).match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    if (!emailPattern || emailPattern.length <= 0 || email.indexOf(" ") >= 0) {
      return send(res, setErrorResponseMsg(RESPONSE.INVALID, "Email"));
    }
    const pwdPattern = String(password).match(/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{6,32}$/);
    if (!pwdPattern || pwdPattern.length <= 0 || password.indexOf(" ") >= 0) {
      return send(res, setErrorResponseMsg(RESPONSE.INVALID, "Password"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await elasticClient.index({
      index: "users",
      document: {
        user_id: user_id,
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    return send(res, RESPONSE.SUCCESS);
  } catch (err) {
    console.log(err.message);

    return send(res, RESPONSE.UNKNOWN_ERROR);
  }
});
