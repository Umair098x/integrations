const express = require("express");
const app = express();

const usersRoutes = require("./user-routes");
const paymentRoutes = require("./payment-routes");
const authRoutes = require("./auth_token-routes");

app.use("/users", usersRoutes);
app.use("/payment", paymentRoutes);
app.use("/auth", authRoutes);

module.exports = app;
