var ball = document.getElementById("ball");

var boxvest = document.getElementById("boxvest");
var boxnord = document.getElementById("boxnord");
var boxoest = document.getElementById("boxoest");
var boxsyd = document.getElementById("boxsyd");
var garden = document.getElementById("garden");
//var output = document.getElementById("output");

var maxX = garden.clientWidth - ball.clientWidth;
var maxY = garden.clientHeight - ball.clientHeight;
// var minX = garden.style.left + ball.clientWidth;
// var minY = garden.style.top + ball.clientHeight;

//Spørger om lov til at bruge iphone orientation

//window.onload = startDeviceOrientation();
function startDeviceOrientation() {
  console.log("StartDeviceOrientation");

  if (typeof DeviceOrientationEvent.requestPermission === "function") {
    DeviceOrientationEvent.requestPermission()
      .then((permissionState) => {
        if (permissionState === "granted") {
          console.log("Vi må bruge iphone");
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
  //Værdier vi skal sende over MQTT?

  var x = event.gamma; // In degree in the range [-90,90]
  var y = -event.beta; // In degree in the range [-180,180]

  //console.log(x);

  //output.innerHTML = "beta : " + x + "\n";
  //output.innerHTML += "gamma: " + y + "\n";

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
  var data = { sendX: x, sendY: y };
  sendMQTT(data);
}

window.addEventListener("deviceorientation", handleOrientation);
