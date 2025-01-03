import * as msal from "@azure/msal-node";
import cachePlugin from "./cachePlugin.js";

const msalConfig = {
  auth: {
    clientId: process.env.CLIENT_ID,
    authority: process.env.AAD_ENDPOINT + "/common",
    // clientSecret: process.env.CLIENT_SECRET,
    // redirectUri: "http://localhost:3000/redirect",
  },
  cache: {
    cachePlugin,
  },
};

const pca = new msal.PublicClientApplication(msalConfig);

export default pca;
