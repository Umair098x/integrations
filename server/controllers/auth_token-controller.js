require("dotenv").config();
const { default: axios } = require("axios");
const { response } = require("../response");
const { refreshGoogleAccessToken } = require("./refresh-token");

async function googleAuthCallBack(req, res) {
  try {
    console.log("hhhhhhhh");
    const htmlContent = await completeAuth(req);
    return res.send(htmlContent);
  } catch (error) {
    return res
      .status(500)
      .json(response(null, null, "Something went wrong", true));
  }
}

async function completeAuth(req) {
  try {
    return `
              <html>
                <head>
                  <script>
                    window.opener.postMessage(
                      {
                        accessToken: "${req.user.accessToken}",
                        refreshToken: "${req.user.refreshToken}",
                        displayName: "${req.user.displayName}"
                      },
                      "http://localhost:3000" // Update this to your frontend's origin if needed
                    );
                    window.close();
                  </script>
                </head>
                <body>
                  <p>Logging in...</p>
                </body>
              </html>
            `;
  } catch (error) {
    return res
      .status(500)
      .json(
        response(null, null, "Something went wrong in completeAuth ", true)
      );
  }
}

async function getProfile(req, res) {
  if (!req.isAuthenticated()) {
    return res.redirect("/");
  }
  res.send(`
      <h1>Hello, ${req.user.displayName}</h1>
      <a href="/drive">View Google Drive Files</a>
      <p>Access Token: ${req.user.accessToken}</p>
      <p>Refresh Token: ${req.user.refreshToken}</p>
      <p>Token Expiry (seconds): ${req.user.tokenExpiry}</p>
    `);
}

async function getDriveFile(req, res) {
  try {
    const data = await axios.get("https://www.googleapis.com/drive/v3/files", {
      headers: { Authorization: `Bearer ${req.user.accessToken}` },
    });

    const resp = response.data;

    return res.status(200).json(response(resp, null, true));
  } catch (error) {
    // Handle any errors that occur during the process
    return res
      .status(500)
      .json(response(null, null, "Something went wrong", true));
  }
}

async function getToken(req, res) {
  try {
    const userId = req.body.user_id;
    const appId = req.body.app_id;

    const token = await refreshGoogleAccessToken(userId, appId);

    console.log("get token on getToken", token);

    return res.status(200).json(response(token, null, true));
  } catch (error) {
    return res
      .status(500)
      .json(response(null, null, "Something went wrong", true));
  }
}

async function callWebHook(req, res) {
  try {
    const access_token = req?.body?.token;
    const query = "I want to retrieve all files";

    const body = {
      access_token,
      query,
    };

    const webHook = await axios.post(
      "https://chatdox.app.n8n.cloud/webhook/42a40beb-90c4-4f48-817f-797b38b72eec",
      body
    );

    console.log("webHook", webHook.data);

    const data = webHook.data;

    return res.status(200).json(response(data, null, true));
  } catch (error) {
    return res
      .status(500)
      .json(response(null, null, "Something went wrong", true));
  }
}

module.exports = {
  googleAuthCallBack,
  getDriveFile,
  completeAuth,
  getProfile,
  getToken,
  callWebHook,
};
