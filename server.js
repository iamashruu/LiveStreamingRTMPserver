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

app.get("/camStat", (req, res) => {
  res.json(cameraMode);
});

const server = app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
