import { Router } from "express";
import { send } from "../helper/responseHelper.js";
import { RESPONSE } from "../configs/global.js";
import axios from "axios";
import getDBConnections from "../helper/dbConnection.js";
const router = Router();

export default router.get("/", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    let config = {
      method: "GET",
      maxBodyLength: Infinity,
      url: process.env.GRAPH_ENDPOINT,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    let { data } = await axios.request(config);

    data = data.value.map((itm) => {
      return {
        id: itm.id,
        createdDateTime: itm.createdDateTime,
        receivedDateTime: itm.receivedDateTime,
        sentDateTime: itm.sentDateTime,
        hasAttachments: itm.hasAttachments,
        subject: itm.subject,
        bodyPreview: itm.bodyPreview,
        importance: itm.importance,
        isRead: itm.isRead,
        isDraft: itm.isDraft,
        body: itm.body,
        sender: itm.sender,
        from: itm.from,
        toRecipients: itm.toRecipients,
      };
    });

    const elasticClient = getDBConnections();

    await elasticClient.index({
      index: "usermails",
      document: {
        data,
      },
    });

    return send(res, RESPONSE.SUCCESS, data);
  } catch (err) {
    console.log(err.message);
    return send(res, RESPONSE.UNKNOWN_ERROR);
  }
});
