import { Router } from "express";
import pca from "../helper/auth.js";
import { send } from "../helper/responseHelper.js";
import { RESPONSE } from "../configs/global.js";
const router = Router();

export default router.get("/", async (req, res) => {
  try {
    console.log('Available Methods:', pca);

    const tokenRequest = {
      // The URL from the redirect will contain the Auth Code in the query parameters
      code: "1.AcYAuZLxJNOFEEeFmtCAYnwb_gVBcVmyUJlJh5AIn2Brc7HGAMfGAA.AgABBAIAAADW6jl31mB3T7ugrWTT8pFeAwDs_wUA9P93U0DGxZO1dFtPO_hJy9jgh2nEOC0icCZDlYkqHG5ShfCIgqtKWZn1-2IRL560TKISwQBM4cm1Rw7Y_Fzp_XVhf0Q8x2rR-yE4RbsbE6z7BiLVC3t47bEjupjd-vhf-p3mDskXgW30oEoX5kTqcs8FYxJuoh8ok5OSfVOmM78T9xSSomJuRIht5aQeiTQBUUVzSKDqWoCCVaiUy-IA03uqkdseKbJ64WaRTafOA56sxQ-6zoXEepSoFEDslYRUwdweKW2T3bE89HzY9dmXWD0iMWN-BxIr-YE0mKj0nVVaz9uyY2ql5MTcljEninPKw91LTNvTVtuOiExrJSnlJ3-_BSgsFg3KxYHWCfXUNYzOL5sFi51PbXPyp1YuRK07KTZ5IGolzOiuHfw4v9ohCJtzREp_tueONkfPI0bGrkg-pE_xuTuYlaLrDWbnCD-YRzKb0iQBqihL0ivFlfhZTvr61byUf6P_V54pAqFK_Jz3vzAGNrHPd01m0NzpQ6Tk9GCuX7cJinD_82GOf98w961LwFjoIeAmh8bxYmmQ7FL5kK7nHPbAN0WQtY9HZmbrx9qxpFZ6J4htIDp3vwXRdIB1yqa7gzr_fCfVWxRG91taSOmuaRDqRqvFgKJz0ViVLs2jP6WQjt-UB5kBNMwHnbw1IXFlx9lQrfeNCR3m5viDk2lmmtHyEY5gRlUFYYyE7Zq1QxPC22CazWsQRXSCkU-UJYy-D160wmYuJoaUvx1Y3Sg3uY4x3lCXm69yWCFnqZkIgqTH_OFw4zNv7q38rxBipaoZLz2X7LQhzQJiQp_1gpV9XtjAMp-nPo5u5ryFH6SnklNFc9qxp3aODQ39-snr91MYmgUZmGvIyDboMrUrhBe3iviiiiHvPYZB1ufe5Rr0MjPUQK0oBp0pAJsta69Dqm5b5BiI1U0CSz4MUphx-McUs4avYxkdBqR2XqXG_2jXZI-d8iEaRT3HVOi4VgKnlvCAg9Lj_OieAGSuUJyAIGoZSgNFmX3LxM5USTP3T_UYyB7JptAMCfiTTw08Le8G74ksPBdf5Wpx1cRIvFCR2czA3tZ5uHzXuCEQo4K1vjZpT_KbuODCvH-iXilgPoN4AoeGuItDHZEEJi0Ze7ND4Jj083fdXJ63_p60qN6dDAz6xSe08USl6ZmbnNJgChy8kDoVBgQfXkW6GYTzixHxQHhF-JzPoALG0H1KkWEK-oz4Hfw9bKW0KinazS4PR7q7qLtn3nuy1oiJWIFnNf8dOXsHj1JgrHQsgxCv-rQ3KVULCPc",
      scopes: ['Mail.read'],
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
