import { Router } from "express";
import { send, setErrorResponseMsg } from "../helper/responseHelper.js";
import { RESPONSE } from "../configs/global.js";
// import axios from "axios";
import getDBConnections from "../helper/dbConnection.js";
// import { getToken, refreshAccessToken } from "../helper/tokenService.js";
import pca from "../helper/auth.js";
import { authenticate } from "../middlewares/jwtAuth.js";
import { axiosFeatchUserMailData } from "../helper/axiosUserMails.js";
const router = Router();

export default router.get("/", authenticate, async (req, res) => {
  try {
    const elasticClient = await getDBConnections();
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

    if (token === null || token === undefined) {
      return send(res, setErrorResponseMsg(RESPONSE.TOKEN_REQUIRED));
    }

    // console.log(token);

    /* user email messages */
    let userMessage = await axiosFeatchUserMailData(process.env.GRAPH_ENDPOINT, token);

    // console.log(req.user);
    // console.log(typeof data, data);

    for (const itm of userMessage.value) {
      await elasticClient.index({
        index: "usersmails",
        document: {
          user_id: req.user.id,
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
        },
      });
    }

    /* user mailbox */
    let mailboxData = await axiosFeatchUserMailData(process.env.MAILBOX_GRAPH_ENDPOINT, token);
    // console.log(mailboxData);
    for (const itm of mailboxData.value) {
      await elasticClient.index({
        index: "usermailbox",
        document: {
          user_id: req.user.id,
          id: itm.id,
          displayName: itm.displayName,
          parentFolderId: itm.parentFolderId,
          childFolderCount: itm.childFolderCount,
          unreadItemCount: itm.unreadItemCount,
          totalItemCount: itm.totalItemCount,
          sizeInBytes: itm.sizeInBytes,
          isHidden: itm.isHidden,
        },
      });
    }

    return send(res, RESPONSE.SUCCESS);
  } catch (err) {
    console.log(err);
    return send(res, RESPONSE.UNKNOWN_ERROR);
  }
});
