const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

let clients = [];

app.use(cors());

app.get("/", (req, res) => {
  const timeout = 60 * 1000; // 1 minute
  const startTime = Date.now();
  console.log(clients.length);
  // Function to send updates to the client
  const sendUpdates = () => {
    if (clients.length > 0) {
      res.json({ message: "Update available" });
      clients = []; // Clear clients after sending update
    } else {
      setTimeout(() => {
        const currentTime = Date.now();
        if (currentTime - startTime >= timeout) {
          res.json({ message: "No updates", timeout: true });
        } else {
          sendUpdates();
        }
      }, 1000); // Check for updates every 1 second
    }
  };

  // Call sendUpdates function
  sendUpdates();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
