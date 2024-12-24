import * as msal from "@azure/msal-node";

const msalConfig = {
  auth: {
    clientId: process.env.CLIENT_ID,
    authority: process.env.AAD_ENDPOINT + "/common/oauth2/v2.0/token",
    // clientSecret: process.env.CLIENT_SECRET,
  },
};

const pca = new msal.PublicClientApplication(msalConfig);

export default pca;
