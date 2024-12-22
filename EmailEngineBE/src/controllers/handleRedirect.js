import { Router } from "express";
import pca from "../helper/auth.js";
import { send } from "../helper/responseHelper.js";
import { RESPONSE } from "../configs/global.js";
const router = Router();

export default router.get("/", async (req, res) => {
  try {

    const tokenRequest = {
      // The URL from the redirect will contain the Auth Code in the query parameters
      code: "1.AcYAuZLxJNOFEEeFmtCAYnwb_gVBcVmyUJlJh5AIn2Brc7HGAMfGAA.AgABBAIAAADW6jl31mB3T7ugrWTT8pFeAwDs_wUA9P_cnMX9YZL4W35W11GZ_23Jb_w7IhdoYDx4LCUDh91Y-DkflYBLoP13sLlPxJP6j1n2CFvYgsYw4cJMv3eu5W0ivXP4vniue6bmU3cmQEOOUsjtzvMGj9J5SE5FuMp-ORuWywKamdmHvOkSq7Q_uPseSbkMIorMwP9Zs-Tsy1d6fAHGFqZASW1hFyz9CCbCHbowi2qHMcjQlSoyDqr1_w8F3bauzfImI7vAwqujjOppz6GXkyFU7YZxq_am2Zo2_QdKUff7UPI5EDeEdWhJWcYqcn2gTG4df3KyUqBhx6Uo_veEyEf7sSD6ER29korbK_BJ5jnus5A2u2iZT2uKuPMlyh44QzinAlSRp4WaF3lXE4-pC89TJfyiqDoIGtrfHjagx7w1SMnthD25Zuyz9oANtIZ97H3bbvEPmHh2C_-gzx7ed9IEKuXUQIgnSCxJUVjpdgjtFXu1kIJj68y5C82_9v_fydR2gmI0g5Z_dPXHaSKfjIUe-4pdwI8Ze0tiodCTyr26EnknpYdzWyXF2Z8MNjK5ypTmmQETbzL8wH0mTPcsjSN9kGdq8Wle1SY9rMVSCEDmtjblqjQucQu90iqwnPsL7NpfYqsj5jZIQIZfe91jytzZuQyTaMBcgwUXhVeaGWBSEqMh5zZFAjYI5yhla-uN0dNDVxaMyUbAlEUoKy2xsir-TE3U9WosPyTKk6ut8o5oQGpNOvwpIyZCqbEHpyifLYI0AfWLnP61JDHCfbGFdbefLOmHO03Z8TB0ZDWl3mDlyYiol2BVTaiVpuFdjh8QXv-0q2XK6w-RV0CKqIogjvsvSCBg55hv5DhJYMGdnqoRyrQrjxyGUog7PtxnDr5VLX8B3TeYjS0Mj3Zqsz2KmvcKL8rjS1b5EnQTTwf84_Clo_rfUMeHNxvxiHBFf3Ot4Jn5an34XzMl7d8LnvFF5X60GBfJ9uF85fgNHl5Gtz8oPOxy1Up15BJRE8UWE4sYv0pUPgcSkFZm6W0yH4dx6ve9mE5x5aruNnnEldAy1s5bniWhKdJuHGog8XGvSsmkY_RLlPMI03BQtA19-O_9DAT4ylvEs3Ec-8c8Q0drUPR6zWYRWdiAL167uGR4KBTkLmM5wsgX_6f6WWxcWmomQhL8pP9Rf_X_B48sLQbwl2cd4QZesdmzDVwNjaDMywTsSERWgP9XHa3WSnawBXO-1ysVM7GEM2Vk82QGd-8QJqz8Va2KCV9Z8kbkgsNrJedm0K3SgZBWzpjv_8vBrVvNdhIJSL6tv-DW9DpSx2Yn1JnVZn6uwv-rEA",
      scopes: ['Mail.Read', 'User.Read'],
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
