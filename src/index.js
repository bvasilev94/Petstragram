const express = require("express");
const expressConfigs = require("./config/express.js");
const handlebarsConfig = require("./config/handlebars.js");
const connectDb = require("./config/database.js");
const router = require("./router.js");

const PORT = 3000;
const app = express();

expressConfigs(app);
handlebarsConfig(app);

connectDb()
  .then(() => console.log("Connected to Database Succesfully"))
  .catch((err) => console.log("Connection to database error", err));

app.use(router);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
