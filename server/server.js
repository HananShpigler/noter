const express = require("express");

require("./config/database");

const userRoute = require("./routes/userRoutes");
const noteRoute = require("./routes/noteRoutes");

const app = express();

app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "*");
  res.set("Access-Control-Allow-METHODS", "*");

  if (res.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  next();
});

app.use(express.json());

app.use(userRoute);
app.use(noteRoute);

const port = process.env.PORT || 8000;

app.listen(port, () =>
  console.log("\x1b[36m%s\x1b[0m", `Server is running on port ${port}`)
);
