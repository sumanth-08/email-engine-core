import axios from "axios";
import qs from "qs";
import getDBConnections from "./dbConnection.js";
import pca from "./auth.js";

export const getRefreshToken = async (code) => {
  try {
    let data = qs.stringify({
      grant_type: "authorization_code",
      code: code,
      client_id: process.env.CLIENT_ID,
      redirect_uri: process.env.REDIRECT_URL,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: process.env.REFRESH_TOKEN_ENDPOINT,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    let res = await axios.request(config);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getToken = async (userId) => {
  const elasticClient = await getDBConnections();

  const data = await elasticClient.search({
    index: "usertokens",
    query: {
      match: { userid: userId },
    },
  });

  return data.hits.hits[0]._source;
};


export const refreshAccessToken = async (userId) => {
  try {
    const elasticClient = await getDBConnections();

    const tokenData = await getToken(userId);

    const tokenRequest = {
      refreshToken: tokenData.refreshToken,
      scopes: ["Mail.Read", "User.Read", "offline_access"],
    };

    const newTokenData = await pca.acquireTokenByRefreshToken(tokenRequest);

    await elasticClient.updateByQuery({
      index: "usertokens",
      query: {
        match: { userid: userId }
      },
      script: {
        source: `
          ctx._source.accessToken = params.accessToken;
          ctx._source.refreshToken = params.refreshToken;
          ctx._source.tokenExpiry = params.tokenExpiry;
        `,
        params: {
          accessToken: newTokenData.accessToken,
          refreshToken: newTokenData.refreshToken || tokenData.refreshToken,
          tokenExpiry: new Date(Date.now() + newTokenData.expiresOn * 1000).toISOString(),
        },
      },
    });

    console.log("Token refreshed successfully");
    return newTokenData.accessToken;
  } catch (err) {
    console.error("Error refreshing token:", err);
    throw err;
  }
};