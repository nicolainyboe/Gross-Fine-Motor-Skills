var ball = document.getElementById("ball");
var boxvest = document.getElementById("boxvest");
var boxnord = document.getElementById("boxnord");
var boxoest = document.getElementById("boxoest");
var boxsyd = document.getElementById("boxsyd");
var garden = document.getElementById("garden");
var output = document.getElementById("output");

var maxX = garden.clientWidth - ball.clientWidth;
var maxY = garden.clientHeight - ball.clientHeight;
// var minX = garden.style.left + ball.clientWidth;
// var minY = garden.style.top + ball.clientHeight;


/*Fra AskForDeviceMotion*/
function startDeviceMotion() {
  if (typeof DeviceOrientationEvent.requestPermission === "function") {
    DeviceOrientationEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === "granted") {
          window.addEventListener("devicemotion", handleDeviceMotion, false);
        }
      })
      .catch(console.log("Vi har ikke fået adgang til deviceorientation"));
  }
}

function handleDeviceMotion() {
  let val = event.acceleration.x;
  val = Math.floor(val);
  console.log(val);
}

/*-------------------------------------/*


/* Fra AskForDeviceOrientation */
//window.onload = startDeviceOrientation();

function startDeviceOrientation() {
  if (typeof DeviceOrientationEvent.requestPermission === "function") {
    DeviceOrientationEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === "granted") {
          window.addEventListener(
            "deviceorientation",
            handleOrientation,
            false
          );
        }
      })
      .catch(console.log("Vi har ikke fået adgang til deviceorientation"));
  }
}

function handleOrientation(event) {
  var x = event.gamma; // In degree in the range [-90,90]
  var y = event.beta; // In degree in the range [-180,180]

  sendMQTT(y)

  output.innerHTML = "beta : " + x + "\n";
  output.innerHTML += "gamma: " + y + "\n";

  // Because we don't want to have the device upside down
  // We constrain the x value to the range [-90,90]
  if (x > 90) {
    x = 90;
  }
  if (x < -90) {
    x = -90;
  }

  // To make computation easier we shift the range of
  // x and y to [0,180]
  x += 90;
  y += 90;

  // 10 is half the size of the ball
  // It center the positioning point to the center of the ball
  ball.style.top = (maxY * y) / 180 - 10 + "px";
  ball.style.left = (maxX * x) / 180 - 10 + "px";

  let topMeasure = parseInt(ball.style.top, 10);
  let leftMeasure = parseInt(ball.style.left, 10);
  //VEST
  if (
    topMeasure >= 350 &&
    topMeasure <= 460 &&
    leftMeasure >= 40 &&
    leftMeasure <= 230
  ) {
    boxvest.style.backgroundColor = "green";
  } else {
    boxvest.style.backgroundColor = "white";
  }
  //SYD left: 410px; top: 640px; height: 70px; width:150px;
  if (
    topMeasure >= 640 &&
    topMeasure <= 750 &&
    leftMeasure >= 410 &&
    leftMeasure <= 600
  ) {
    boxsyd.style.backgroundColor = "green";
  } else {
    boxsyd.style.backgroundColor = "white";
  }
  // OEST width: 150px;height: 70px;left: 760px;top: 350px;
  if (
    topMeasure >= 350 &&
    topMeasure <= 460 &&
    leftMeasure >= 760 &&
    leftMeasure <= 950
  ) {
    boxoest.style.backgroundColor = "green";
  } else {
    boxoest.style.backgroundColor = "white";
  }
  //NORD width: 150px;height: 70px;left: 410px;top: 40px;
  if (
    topMeasure >= 40 &&
    topMeasure <= 150 &&
    leftMeasure >= 410 &&
    leftMeasure <= 600
  ) {
    boxnord.style.backgroundColor = "green";
  } else {
    boxnord.style.backgroundColor = "white";
  }
}

window.addEventListener("deviceorientation", handleOrientation);
