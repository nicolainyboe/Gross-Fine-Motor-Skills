// SETUP MQTT ------------------------------------------
const broker = "influx.itu.dk";
const port = 9002;
const secured = true;
const topicx = "ituF2020/EXPD/TDCmignuitu_v2_x";
const topicy = "ituF2020/EXPD/TDCmignuitu_v2_y";
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
}

function sendMQTT(data) {
  let mOBJ = { deviceID: myID, content: data };

  let mSend = new Paho.MQTT.Message(JSON.stringify(mOBJ));
  mSend.destinationName = topicx;

  mqttClient.send(mSend);
}

function receiveMessage(message) {
  let mUnpack = JSON.parse(message.payloadString);
  let senderID = mUnpack.deviceID;

  let receivedMessage = mUnpack.content;

  //do stuff with the message

  ball.style.left = (maxX * receivedMessage.sendX) / 180 - 10 + "px";
  ball.style.top = (maxY * receivedMessage.sendY) / 180 - 10 + "px";

  let topMeasure = parseInt(ball.style.top, 10);
  let leftMeasure = parseInt(ball.style.left, 10);

  //Farv boksene

  if (
    //VEST
    topMeasure >= rect1.y &&
    topMeasure <= rect1.y + rect1.height &&
    leftMeasure >= rect1.x &&
    leftMeasure <= rect1.x + rect1.width
  ) {
    document.getElementById("boxvest").style.backgroundColor = "lightblue";
  } else if (
    //NORD
    topMeasure >= rect2.y &&
    topMeasure <= rect2.y + rect2.height &&
    leftMeasure >= rect2.x &&
    leftMeasure <= rect2.x + rect2.width
  ) {
    document.getElementById("boxnord").style.backgroundColor = "lightblue";
  } else if (
    //ØST
    topMeasure >= rect3.y &&
    topMeasure <= rect3.y + rect3.height &&
    leftMeasure >= rect3.x &&
    leftMeasure <= rect3.x + rect3.width
  ) {
    document.getElementById("boxoest").style.backgroundColor = "lightblue";
  } else if (
    //SYD
    topMeasure >= rect4.y &&
    topMeasure <= rect4.y + rect4.height &&
    leftMeasure >= rect4.x &&
    leftMeasure <= rect4.x + rect4.width
  ) {
    document.getElementById("boxsyd").style.backgroundColor = "lightblue";
  } else {
    document.getElementById("boxvest").style.backgroundColor = "white";
    document.getElementById("boxnord").style.backgroundColor = "white";
    document.getElementById("boxoest").style.backgroundColor = "white";
    document.getElementById("boxsyd").style.backgroundColor = "white";

    //border
    // document.getElementById("boxvest").style.borderWidth = "2px";
    // document.getElementById("boxnord").style.borderWidth = "2px";
    // document.getElementById("boxoest").style.borderWidth = "2px";
    // document.getElementById("boxsyd").style.borderWidth = "2px";

    counterFunction.done = false;
  }
}
let count = -1;
let sequence = [2, 4, 2, 3, 1, 2, 1, 3];
let boxnum;

function ifRightSequence(e) {
  for (i = 0; i < sequence.length; i++) {
    if (e == sequence[count]) {
      console.log("Yeps");
      if (boxnum == 1) {
        document.getElementById("boxvest").style.backgroundColor = "green";
      } else if (boxnum == 2) {
        document.getElementById("boxnord").style.backgroundColor = "green";
      } else if (boxnum == 3) {
        document.getElementById("boxoest").style.backgroundColor = "green";
      } else if (boxnum == 4) {
        document.getElementById("boxsyd").style.backgroundColor = "green";
      }
    }
  }
}

function ifNotRightFunction(e) {
  for (i = 0; i < sequence.length; i++) {
    if (e != sequence[count]) {
      console.log("Nope");
      count = -1;

      //Alle blinker
      document.getElementById("boxvest").style.backgroundColor = "red";
      document.getElementById("boxnord").style.backgroundColor = "red";
      document.getElementById("boxoest").style.backgroundColor = "red";
      document.getElementById("boxsyd").style.backgroundColor = "red";
    }
  }
}

var counterFunction = function () {
  if (counterFunction.done) return;
  console.log("COUNTERFUNCTION");
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
