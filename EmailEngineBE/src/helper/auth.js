import * as msal from "@azure/msal-node";

const msalConfig = {
  auth: {
    clientId: process.env.CLIENT_ID,
    authority: process.env.AAD_ENDPOINT + "/common"
  },
};

const pca = new msal.PublicClientApplication(msalConfig);

export default pca;

// const tokenRequest = {
//   scopes: [process.env.GRAPH_ENDPOINT + "/.default"],
// };

// const apiConfig = {
//   uri: process.env.GRAPH_ENDPOINT + "/v1.0/users",
// };

// const cca = new msal.ConfidentialClientApplication(msalConfig);

// /**
//  * Acquires token with client credentials.
//  * @param {object} tokenRequest
//  */
// async function getToken(tokenRequest) {
//   return await cca.acquireTokenByClientCredential(tokenRequest);
// }

// export default {
//   apiConfig: apiConfig,
//   tokenRequest: tokenRequest,
//   getToken: getToken,
// };
