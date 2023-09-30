const express = require("express");
const app = express();
const NodeMediaServer = require("node-media-server");

// Serve static files from the "public" directory
app.use(express.static("public"));

// RTMP Streaming Configuration
const config = {
  rtmp: {
    port: 1935, // RTMP port
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: 8000, // HTTP port for HLS
    allow_origin: "*",
  },
};

const nms = new NodeMediaServer(config);
nms.run();

// Send Camera Mode with Selected Primary Camera
let mode = "multi";
let primaryCameraNo = 0;
let cameraMode = {
  mode,
  primary: primaryCameraNo,
};

// Handle the /camStat route
app.get("/camStat", (req, res) => {
  res.json(cameraMode);
});

// Handle other routes, or use a catch-all route
app.get("*", (req, res) => {
  // Handle other routes or return an appropriate response
  res.send("Hello, this is your Express app!");
});

// Use process.env.PORT for port to work on Vercel
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
