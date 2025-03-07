var express = require("express");
const router = express.Router();
const { authController } = require("../controllers");
const bodyParser = require("body-parser");
const authenticateToken = require("../middleware/authenticateToken");
router.use(bodyParser.json());
const passport = require("passport");

// insert data
router.get("/", async function (req, res) {
  console.log("Testing signup");
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

// router.get(
//   "/google",
//   passport.authenticate("google", {
//     scope: ["profile", "https://www.googleapis.com/auth/drive"],
//     accessType: "offline",
//     prompt: "consent",
//   })
// );

router.get("/google", (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "https://www.googleapis.com/auth/drive"],
    accessType: "offline",
    prompt: "consent",
    state: req.query.state, // Pass along the state (user_id and app_id)
  })(req, res, next);
});

router.get(
  "/google/redirect",
  passport.authenticate("google", { failureRedirect: "/" }),
  async function (req, res) {
    authController.googleAuthCallBack(req, res);
  }
);

router.get("/google/complete", async function (req, res) {
  authController.completeAuth(req, res);
});
router.get("/profile", async function (req, res) {
  authController.getProfile(req, res);
});
router.get("/drive", async function (req, res) {
  authController.getDriveFile(req, res);
});

router.post("/token", async function (req, res) {
  authController.getToken(req, res);
});

router.post("/webHook", async function (req, res) {
  authController.callWebHook(req, res);
});

module.exports = router;
