import getDBConnections from "./dbConnection";
import { send, setErrorResponseMsg } from "./responseHelper.js";
import { RESPONSE } from "../configs/global.js";

const tokenXpired = (expireTime) => {
  return new Date(expireTime) <= new Date();
};

const getUserToken = async (userId) => {
  const es = await getDBConnections();

  const data = await es.search({
    index: "users",
    query: { match: { userId } },
  });
  if (data.hits.total.value === 0) return null;
  return data.hits.hits[0]._source;
};

const saveUserToken = async (userId, token) => {
  const es = await getDBConnections();
  await es.index({
    index: "users",
    id: userId,
    document: {
      userId,
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
      tokenExpiry: token.tokenExpiry,
    },
  });
};

//
const refreshToken = async (userId) => {
  try {
    const TOKEN_URL = "https://login.microsoftonline.com/common/oauth2/v2.0/token";
    const tokenData = await getToken(userId);
    if (!tokenData || !tokenData.refreshToken) {
      return send(res, setErrorResponseMsg(RESPONSE.NOT_FOUND, "Refresh Token"));
    }

    const data = qs.stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: tokenData.refreshToken,
      scope: "https://graph.microsoft.com/.default",
    });

    const response = await axios.post(TOKEN_URL, data, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    const { access_token, refresh_token, expires_in } = response.data;

    await saveToken(userId, {
      accessToken: access_token,
      refreshToken: refresh_token || tokenData.refreshToken,
      tokenExpiry: new Date(Date.now() + expires_in * 1000).toISOString(),
    });

    console.log(access_token);
    return access_token;
  } catch (err) {
    return send(res, RESPONSE.UNKNOWN_ERROR);
  }
};

//

const validateToken = async (userId) => {
  const tokenData = await getUserToken(userId);
  if (!tokenData) {
    return send(res, setErrorResponseMsg(RESPONSE.NOT_FOUND, "User token"));
  }

  if (tokenXpired(tokenData.tokenExpiry)) {
    return await refreshToken(userId);
  }

  return tokenData.accessToken;
};

export { validateToken, refreshToken, getUserToken, saveUserToken };
