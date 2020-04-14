// SETUP MQTT ------------------------------------------

const broker = "influx.itu.dk";
const port = 9002;
const secured = true;
const topicx = "ituF2020/EXPD/TDCmignuitu_v2_x";
const topicy = "ituF2020/EXPD/TDCmignuitu_v2_y";
const data = "ituF2020/EXPD/logging";
const myID = "id" + parseInt(Math.random() * 100000, 10);

// CONNECT ----------------------------------------------
//Ball Inputs
var ball = document.getElementById("ball");
var maxX = garden.clientWidth - ball.clientWidth;
var maxY = garden.clientHeight - ball.clientHeight;

let mqttClient = new Paho.MQTT.Client(broker, port, myID);

mqttClient.connect({ onSuccess: onConnect, useSSL: secured });
mqttClient.onConnectionLost = conLost;
mqttClient.onMessageArrived = receiveMessage;

// MQTT Handler functions--------------------------------

function onConnect() {
  console.log("Connected");
  mqttClient.subscribe(topicx);
  mqttClient.subscribe(topicy);
  if (true) {
    sendMQTT(orderFalsk);
  }
}

function sendMQTT(data) {
  //console.log("sending");
  //console.log("message" + message);
  let mOBJ = { deviceID: myID, content: data };

  let mSend = new Paho.MQTT.Message(JSON.stringify(mOBJ));
  mSend.destinationName = topicx;

  mqttClient.send(mSend);

  // mOBJ = { deviceID: myID, content: y };
  // mSend = new Paho.MQTT.Message(JSON.stringify(mOBJ));
  // mSend.destinationName = topicy;

  // mqttClient.send(mSend);
}
function sendOrder(data) {
  //console.log("sending");
  //console.log("message" + message);
  let mOBJ = { deviceID: myID, content: data };

  let mSend = new Paho.MQTT.Message(JSON.stringify(mOBJ));
  mSend.destinationName = data;

  mqttClient.send(mSend);

  // mOBJ = { deviceID: myID, content: y };
  // mSend = new Paho.MQTT.Message(JSON.stringify(mOBJ));
  // mSend.destinationName = topicy;

  // mqttClient.send(mSend);
}

function receiveMessage(message) {
  //console.log("message received");
  let mUnpack = JSON.parse(message.payloadString);
  let senderID = mUnpack.deviceID;

  let receivedMessage = mUnpack.content;
  //console.log(mUnpack);
  //do stuff with the message
  //console.log(receivedMessage.sendX);
  //console.log(receivedMessage.sendY);
  ball.style.left = (maxX * receivedMessage.sendX) / 180 - 10 + "px";
  ball.style.top = (maxY * receivedMessage.sendY) / 180 - 10 + "px";

  let topMeasure = parseInt(ball.style.top, 10);
  // console.log(topMeasure);
  let leftMeasure = parseInt(ball.style.left, 10);

  //VEST

  if (
    topMeasure >= 350 &&
    topMeasure <= 460 &&
    leftMeasure >= 40 &&
    leftMeasure <= 230
  ) {
    boxnum = 1;
    counterFunction();
    ifRightSequence();
  } else if (
    topMeasure >= 40 &&
    topMeasure <= 150 &&
    leftMeasure >= 410 &&
    leftMeasure <= 600
  ) {
    boxnum = 2;
    counterFunction();
    ifRightSequence();
  } else if (
    topMeasure >= 640 &&
    topMeasure <= 750 &&
    leftMeasure >= 410 &&
    leftMeasure <= 600
  ) {
    boxnum = 4;
    counterFunction();
    ifRightSequence();
  } else if (
    topMeasure >= 350 &&
    topMeasure <= 460 &&
    leftMeasure >= 760 &&
    leftMeasure <= 950
  ) {
    boxnum = 3;
    counterFunction();
    ifRightSequence();
  } else {
    // document.getElementById("collision").innerHTML = null;
    document.getElementById("collision").innerHTML =
      "Counter = " + count + " " + "boxnum = " + boxnum;
    document.getElementById("boxvest").style.backgroundColor = "white";
    document.getElementById("boxnord").style.backgroundColor = "white";
    document.getElementById("boxoest").style.backgroundColor = "white";
    document.getElementById("boxsyd").style.backgroundColor = "white";
    counterFunction.done = false;
  }

  //Hvordan bruger vi vores objekter, istedet for hardcoded tal som ovenstående??? ^

  // if (
  //   rect1.x < topMeasure &&
  //   rect1.x + rect1.width > topMeasure &&
  //   rect1.y < leftMeasure &&
  //   rect1.y + rect1.height > leftMeasure
  // ) {
  //   // collision detected!
  //   boxnum = 1;
  //   counterFunction();
  //   ifRightSequence(1);
  //   ifNotRightFunction(1);
  // } else if (
  //   rect2.x < topMeasure &&
  //   rect2.x + rect2.width > topMeasure &&
  //   rect2.y < leftMeasure &&
  //   rect2.y + rect2.height > leftMeasure
  // ) {
  //   boxnum = 2;
  //   counterFunction();
  //   ifRightSequence(2);
  //   ifNotRightFunction(2);
  // } else if (
  //   rect3.x < topMeasure &&
  //   rect3.x + rect3.width > topMeasure &&
  //   rect3.y < leftMeasure &&
  //   rect3.y + rect3.height > leftMeasure
  // ) {
  //   boxnum = 3;
  //   counterFunction();
  //   ifRightSequence(3);
  //   ifNotRightFunction(3);
  // } else if (
  //   rect4.x < topMeasure &&
  //   rect4.x + rect4.width > topMeasure &&
  //   rect4.y < leftMeasure &&
  //   rect4.y + rect4.height > leftMeasure
  // ) {
  //   boxnum = 4;
  //   counterFunction();
  //   ifRightSequence(4);
  //   ifNotRightFunction(4);
  // } else {
  //   // document.getElementById("collision").innerHTML = null;
  //   document.getElementById("collision").innerHTML =
  //     "Counter = " + count + " " + "boxnum = " + boxnum;
  //   document.getElementById("boxvest").style.backgroundColor = "white";
  //   document.getElementById("boxnord").style.backgroundColor = "white";
  //   document.getElementById("boxoest").style.backgroundColor = "white";
  //   document.getElementById("boxsyd").style.backgroundColor = "white";
  //   counterFunction.done = false;
  // }
}
let count = 0;
let sequence = [2, 4, 2, 3, 1, 2, 1];
let boxnum;

let order = [];
let orderFalsk = {
  order: [1, 2, 3],
};
sendOrder(orderFalsk);
document.getElementById("collision").innerHTML =
  "Counter = " + count + " " + "boxnum = " + boxnum;
function ifRightSequence() {
  if (count >= sequence.length) {
    console.log("det var hvad du troede var rækkefølgen");
    window.alert("Du mener rækkefølgen er; " + order);
  }
}

var counterFunction = function () {
  if (counterFunction.done) return;
  console.log("COUNTERFUNCTION");
  if (boxnum == 1) {
    document.getElementById("collision").innerHTML =
      "Counter = " + count + " " + "boxnum = " + boxnum;
    document.getElementById("boxvest").style.backgroundColor = "yellow";
    order.push(1);
  } else if (boxnum == 2) {
    document.getElementById("collision").innerHTML =
      "Counter = " + count + " " + "boxnum = " + boxnum;
    document.getElementById("boxnord").style.backgroundColor = "yellow";
    order.push(2);
  } else if (boxnum == 3) {
    document.getElementById("collision").innerHTML =
      "Counter = " + count + " " + "boxnum = " + boxnum;
    document.getElementById("boxoest").style.backgroundColor = "yellow";
    order.push(3);
  } else if (boxnum == 4) {
    document.getElementById("collision").innerHTML =
      "Counter = " + count + " " + "boxnum = " + boxnum;
    document.getElementById("boxsyd").style.backgroundColor = "yellow";
    order.push(4);
  }
  console.log(order);
  count++;
  counterFunction.done = true;
};
var boxvest = window.getComputedStyle(document.getElementById("boxvest"), null);
var boxnord = window.getComputedStyle(document.getElementById("boxnord"), null);
var boxoest = window.getComputedStyle(document.getElementById("boxoest"), null);
var boxsyd = window.getComputedStyle(document.getElementById("boxsyd"), null);

var rect1 = {
  x: parseInt(boxvest.getPropertyValue("left"), 10),
  y: parseInt(boxvest.getPropertyValue("top"), 10),
  width: parseInt(boxvest.getPropertyValue("width"), 10),
  height: parseInt(boxvest.getPropertyValue("height"), 10),
  num: 1,
};

var rect2 = {
  x: parseInt(boxnord.getPropertyValue("left"), 10),
  y: parseInt(boxnord.getPropertyValue("top"), 10),
  width: parseInt(boxnord.getPropertyValue("width"), 10),
  height: parseInt(boxnord.getPropertyValue("height"), 10),
  num: 2,
};

var rect3 = {
  x: parseInt(boxoest.getPropertyValue("left"), 10),
  y: parseInt(boxoest.getPropertyValue("top"), 10),
  width: parseInt(boxoest.getPropertyValue("width"), 10),
  height: parseInt(boxoest.getPropertyValue("height"), 10),
  num: 3,
};

var rect4 = {
  x: parseInt(boxsyd.getPropertyValue("left"), 10),
  y: parseInt(boxsyd.getPropertyValue("top"), 10),
  width: parseInt(boxsyd.getPropertyValue("width"), 10),
  height: parseInt(boxsyd.getPropertyValue("height"), 10),
  num: 4,
};

function conLost() {
  console.log("Lost connection");
}
