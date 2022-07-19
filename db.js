const mongoose = require("mongoose");
const http = require("http");
const app = require("./index");
const server = http.createServer(app);
const port = process.env.PORT || 3000;
async function start() {
  try {
    await mongoose.connect("mongodb://localhost:27017/Employee");
    console.log("Connection succeeded");
    server.listen(port, () => {
      console.log("Server started at: " + port);
    });
  } catch {
    console.log("An Error occured while connecting");
  }
}
start();
