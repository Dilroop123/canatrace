const express = require("express");
const cors = require("cors");
const app = express();

const path = require("path");
const fs = require("fs");

// Enables CORS
app.use(cors({ origin: true }));

const frontendDir = path.join(__dirname, "./build");

if (fs.existsSync(frontendDir)) {
  app.use("/", express.static(frontendDir));

  app.get("*", function (request, response) {
    response.sendFile(path.resolve(frontendDir, "index.html"));
  });
}

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
