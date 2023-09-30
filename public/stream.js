if (flvjs.isSupported()) {
  const videoElement = document.getElementById("video");
  const flvPlayer = flvjs.createPlayer({
    type: "flv",
    url: "http://localhost:8000/live/ash.flv",
  });
  flvPlayer.attachMediaElement(videoElement);
  flvPlayer.load();
  flvPlayer.play();
}
