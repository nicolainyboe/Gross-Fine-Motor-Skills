var ball = document.getElementById("ball");
var boxvest = document.getElementById("boxvest");
var boxnord = document.getElementById("boxnord");
var boxoest = document.getElementById("boxoest");
var boxsyd = document.getElementById("boxsyd");
var garden = document.getElementById("garden");
var output = document.getElementById("output");

var maxX = garden.clientWidth - ball.clientWidth;
var maxY = garden.clientHeight - ball.clientHeight;

function handleOrientation(event) {
  var x = event.beta; // In degree in the range [-180,180]
  var y = event.gamma; // In degree in the range [-90,90]

  output.innerHTML = "beta : " + x + "\n";
  output.innerHTML += "gamma: " + y + "\n";
  output.innerHTML += "Ball Top: " + ball.style.top + "\n";
  output.innerHTML += "Ball Left: " + ball.style.left + "\n";
  output.innerHTML += "Box Vest: " + boxvest.style.width + "\n";

  // width: 150px;
  // height: 70px;
  // left: 40px;
  // top: 350px;

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

  if (topMeasure >= 350 && topMeasure <= 420) {
    boxvest.style.backgroundColor = "green";
  } else {
    boxvest.style.backgroundColor = "white";
  }

  console.log(topMeasure);
}

window.addEventListener("deviceorientation", handleOrientation);
