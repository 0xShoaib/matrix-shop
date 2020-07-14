const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = process.env.PORT || 5000;
const app = new express();

if (process.env.NODE_ENV != "production") require("dotenv").config();

mongoose.connect(process.env.MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connection established with MongoDB!!");
});

mongoose.connection.on("error", (err) => {
  console.log("Connection failed with MongoDB!!");
  console.log("Error =>", err);
});

require("./models/user");
require("./models/product");

app.use(express.json());
app.use(cors());

app.use(require("./routes/auth"));
app.use(require("./routes/product"));
app.use(require("./routes/payment"));

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});
