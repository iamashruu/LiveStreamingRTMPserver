const express = require("express");
const app = express();
const NodeMediaServer = require("node-media-server");

const cors = require("cors");
app.use(express.json());
// Enable CORS for all routes
app.use(cors());

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
let primaryCameraNo = "0";
let cameraSetting = {
  mode,
  primary: primaryCameraNo,
};

app.post("/startStream", (req, res) => {
  const { cameraMode, primaryCamera } = req.body;
  console.log(cameraMode, primaryCamera);

  cameraSetting = {
    mode: cameraMode,
    primary: primaryCamera,
  };
  res.json(cameraSetting);
});

// Handle the /camStat route
app.get("/camStat", (req, res) => {
  res.json(cameraSetting);
});

let sensorData = {
  message: "Rocket data received",
  isSuccess: true,
  data: {
    acceleration: 10,
    velocity: 20,
    altitude: 30,
    setRange: 100,
    currentRange: 70,
  },
};

setInterval(() => {
  // Randomize sensor data values
  sensorData.data.acceleration = Math.floor(Math.random() * 100);
  sensorData.data.velocity = Math.floor(Math.random() * 100);
  sensorData.data.altitude = Math.floor(Math.random() * 100);
  // sensorData.data.setRange = Math.floor(Math.random() * 100);
  sensorData.data.currentRange = Math.floor(Math.random() * 100);
}, 200);

app.get("/api/sensor/data", (req, res) => {
  res.json(sensorData);
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
