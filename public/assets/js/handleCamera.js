let PORT = 8000;
let RTMP_URL = window.location.origin;
// let RTMP_URL = "https://live-streaming-rtmp-server.vercel.app";

async function getData() {
  const response = await fetch(`/camStat`);
  const data = await response.json();
  console.log(data);
  return data;
}
async function setUp() {
  let data = await getData();
  // console.log(data);
  let secondaryCam = [0, 1, 2];
  let newSecondaryCam = [0, 0, 0];
  // let newSecondaryCam = secondaryCam.filter((cam) => cam !== data.primary); //rtmp need
  console.log(newSecondaryCam);
  let camera = {
    primary: `${RTMP_URL}:${PORT}/livecamera/${data.primary}.flv`,
    secondary: [
      `${RTMP_URL}:${PORT}/livecamera/${newSecondaryCam[0]}.flv`,
      `${RTMP_URL}:${PORT}/livecamera/${newSecondaryCam[1]}.flv`,
    ],
  };

  let selectedMode = "single"; // Default mode is single camera
  function flvVideoPlay(url, selectCamera) {
    if (flvjs.isSupported()) {
      const videoElement = document.querySelector(selectCamera);
      const flvPlayer = flvjs.createPlayer({
        type: "flv",
        url,
      });
      flvPlayer.attachMediaElement(videoElement);
      flvPlayer.load();
      flvPlayer.play();
    }
  }

  function updateUI(primaryImage, secondaryImages) {
    // const primaryCamera = document.querySelector(".primaryImage"); //rtmp need
    const primaryContainer = document.querySelector(".camera-primary");
    // primaryCamera.src = primaryImage;
    console.log(primaryImage);
    primaryContainer.innerHTML = `<video id="video" class='primaryVideo' autoplay muted></video>`;
    // let url = "http://localhost:8000/livecamera/0.flv";
    // flvVideoPlay(url, ".primaryVideo");
    flvVideoPlay(primaryImage, ".primaryVideo");

    // Show/hide small camera container based on mode
    const smallCameraContainer = document.querySelector(
      ".camera-small-container"
    );
    const footer = document.querySelector("footer");
    const main = document.querySelector("main");

    if (selectedMode === "single") {
      smallCameraContainer.style.display = "none";
      // primaryCamera.style.width = "100vw"; //rtmp need
      // primaryCamera.style.height = "auto";
      main.style.height = "calc(91.6vh)";

      // primaryCamera.style.zIndex = "10";
      footer.style.background = "transparent";
    } else {
      smallCameraContainer.style.display = "flex";
      smallCameraContainer.style.flexDirection = "column";
      // for small device
      // smallCameraContainer.style.flexDirection = "row";
      // primaryCamera?.style?.width = "100%"; //rtmp need
      // primaryCamera?.style.height = "100%"; //rtmp need
      // main.style.height = "calc(92vh - 8vh)";
      main.style.height = "calc(92vh)";
      footer.style.background = "transparent";

      const secondaryCam2 = document.querySelector(".camera2");
      const secondaryCam3 = document.querySelector(".camera3");

      secondaryCam2.innerHTML = `<video id="video2" class='secondaryVideo' autoplay muted></video>`;
      secondaryCam3.innerHTML = `<video id="video3" class='secondaryVideo2' autoplay muted></video>`;

      flvVideoPlay(secondaryImages[0], ".secondaryVideo");
      flvVideoPlay(secondaryImages[0], ".secondaryVideo2");
    }
  }

  function switchMode(mode) {
    selectedMode = mode;
    if (mode === "single") {
      updateUI(camera.primary, []);
    } else if (mode === "multi") {
      updateUI(camera.primary, camera.secondary);
    }
  }

  // Initial UI update
  updateUI(camera.primary, []);

  // Example usage of switching modes
  // switchMode("multi"); // Switch to multi-camera mode
  // switchMode("single"); // Switch to single-camera mode
  switchMode(data.mode); // Switch to single-camera mode
}

// setInterval("setUp()", 200);

setUp();
