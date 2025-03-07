const axios = require("axios");
const { myDb } = require("../connection"); // or wherever your DB connection is
const { RunQuery } = require("../services");

/**
 * Refresh the user's Google access token if expired.
 * @param {string} userId The user_id in your database
 * @param {number} appId The app_id in your database
 * @returns {Promise<string>} The valid (possibly refreshed) access token
 */
async function refreshGoogleAccessToken(userId, appId) {
  try {
    const query =
      "SELECT * FROM User_Applications WHERE user_id = ? AND app_id = ?";

    const result = await RunQuery(query, [userId, appId]);
    const data = result.success;
    console.log({ data });

    if (!data || !data.length) {
      return null;
    }

    const { access_token, refresh_token, token_expiry, created_at } = data[0];

    const createdAtMs = new Date(created_at).getTime();
    const expiresAtMs = createdAtMs + token_expiry * 1000;
    const nowMs = Date.now();

    if (nowMs < expiresAtMs) {
      console.log("token is not expired");
      return access_token;
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    try {
      const response = await axios.post("https://oauth2.googleapis.com/token", {
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refresh_token,
        grant_type: "refresh_token",
      });

      const { access_token: newAccessToken, expires_in } = response.data;

      console.log("create new token", newAccessToken, expires_in);
      const updateQuery = `
      UPDATE User_Applications
      SET access_token = ?, token_expiry = ?, created_at = NOW()
      WHERE user_id = ? AND app_id = ?
    `;
      const data = await RunQuery(updateQuery, [
        newAccessToken,
        expires_in,
        userId,
        appId,
      ]);

      console.log("save new token", data.success);

      return newAccessToken;
    } catch (err) {
      console.error("Error refreshing token:", err.response?.data || err);
      return "Something went wrong in creating new token";
    }
  } catch (error) {
    return "Something went wrong";
  }
}

module.exports = {
  refreshGoogleAccessToken,
};
