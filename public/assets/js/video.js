// set up url code
function getInputValue() {
  let inputUrl = document.getElementById("myInput").value;
  let url = document.querySelector(".urlcode");
  url.textContent = "url link is:" + inputUrl;
  localStorage.setItem("urlcode", inputUrl);
  localStorage.getItem("urlcode");
  return inputUrl;
}

function getRangeValue() {
  let inputRange = document.getElementById("myRange").value;
  let range = document.querySelector(".rangecode");
  range.textContent = "The range is:" + inputRange;
  localStorage.setItem("setrange", inputRange);
  return inputRange;
}

function getApiValue() {
  let inputApi = document.getElementById("myApi").value;
  let Api = document.querySelector(".Apicode");
  Api.textContent = "The Api is:" + inputApi;
  localStorage.setItem("setApi", inputApi);
  return inputApi;
}

document.addEventListener(
  "keydown",
  function (e) {
    if (e.key === "Enter") {
      toggleFullScreen();
    }
  },
  false
);

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

const progress = document.querySelector(".progress-done");
const percent = document.querySelector("small");

let width = 50; // Set your desired width here
progress.style.height = width + "%";
percent.textContent = `${parseInt(width)}%`;
console.log(width);
async function getData() {
  // let url = "http://aef4-103-132-90-225.ap.ngrok.io/api/allparams";
  // let url = 'https://jsonplaceholder.typicode.com/todos';
  let api = localStorage.getItem("setApi");
  let url = `${api}`;
  console.log(typeof url);
  console.log(url);
  console.log(api);
  try {
    let res = await fetch(url);
    // console.log(res);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

// Render Data
async function renderData() {
  let database = await getData();

  console.log(database.battery);
  console.log(database.altemeter);

  let altitudeValue = database.altitude;
  let accX = database.accx;
  console.log(accX);
  let accY = database.accy;
  let accZ = database.accz;
  let velocity = database.vlinear;

  let altitude = document.querySelector(".altitude");
  let XAxis = document.querySelector(".XAxis");
  let YAxis = document.querySelector(".YAxis");
  let ZAxis = document.querySelector(".ZAxis");
  let kmh = document.querySelector(".velocityKmh");

  altitude.textContent = "Altitude " + altitudeValue + " ft";
  XAxis.textContent = accX;
  YAxis.textContent = accY;
  ZAxis.textContent = accZ;
  kmh.textContent = velocity;

  // localStorage.setItem("setrange", 100);
  // localStorage.setItem("rangekm", 35);
  let setRange = localStorage.getItem("setrange");
  // let rangeKM = localStorage.getItem("rangekm");
  let rangeKM = altitudeValue;
  console.log(rangeKM);
  let percentage = (rangeKM / setRange) * 100;

  return (db = {
    percentageX: percentage,
    setRange: setRange,
    rangeKM: rangeKM,
  });
}

let dbstore;
async function db2() {
  dbstore = renderData().then(
    (value) => {
      console.log(value.setRange);
      console.log(value.percentageX);

      // progressbar
      function update() {
        const progress = document.querySelector(".progress-done");
        const percent = document.querySelector("small");

        let width = 1;
        width = 50;
        // width = value.percentageX;
        progress.style.height = width + "%";
        percent.innerHTML = `${parseInt(width)}%`;
        console.log(width);
      }
      update();
    },
    (error) => {
      console.log(error);
    }
  );
}

setInterval("db2()", 200); // Call a function every 10000 milliseconds (OR 10 seconds).
