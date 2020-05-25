var ball = document.getElementById("ball");

var boxvest = document.getElementById("boxvest");
var boxnord = document.getElementById("boxnord");
var boxoest = document.getElementById("boxoest");
var boxsyd = document.getElementById("boxsyd");
var garden = document.getElementById("garden");

var maxX = garden.clientWidth - ball.clientWidth;
var maxY = garden.clientHeight - ball.clientHeight;

//Spørger om lov til at bruge iphone orientation

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
  //Værdier vi skal sende over MQTT
  var x = event.gamma;
  var y = -event.beta;
  if (x > 90) {
    x = 90;
  }
  if (x < -90) {
    x = -90;
  }
  x += 90;
  y += 90;
  var data = { sendX: x, sendY: y };
  sendMQTT(data);
}
window.addEventListener("deviceorientation", handleOrientation);
