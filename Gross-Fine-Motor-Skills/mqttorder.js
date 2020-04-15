// SETUP MQTT ------------------------------------------

const broker = "influx.itu.dk";
const port = 9002;
const secured = true;
const topicx = "ituF2020/EXPD/TDCmignuitu_v2_x";
const topicy = "ituF2020/EXPD/TDCmignuitu_v2_y";
const datalogging = "ituF2020/EXPD/logging";
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
  mqttClient.subscribe(datalogging);
}

function sendMQTT(data) {
  let mOBJ = { deviceID: myID, content: data };

  let mSend = new Paho.MQTT.Message(JSON.stringify(mOBJ));
  mSend.destinationName = topicx;

  mqttClient.send(mSend);
}
function sendOrder(data) {
  let loggingOBJ = { deviceID: myID, content: data };

  let sendLogging = new Paho.MQTT.Message(JSON.stringify(loggingOBJ));
  sendLogging.destinationName = datalogging;
  console.log("jeg sender?");
  console.log(mqttClient.send(sendLogging));
  mqttClient.send(sendLogging);
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

  //Kør sekvensen igen uden feedback

  if (
    //VEST
    topMeasure >= 250 &&
    topMeasure <= 430 &&
    leftMeasure >= 60 &&
    leftMeasure <= 180
  ) {
    boxnum = 1;
    counterFunction();
    ifRightSequence();
  } else if (
    //NORD
    topMeasure >= 40 &&
    topMeasure <= 140 &&
    leftMeasure >= 390 &&
    leftMeasure <= 590
  ) {
    boxnum = 2;
    counterFunction();
    ifRightSequence();
  } else if (
    //ØST
    topMeasure >= 250 &&
    topMeasure <= 430 &&
    leftMeasure >= 780 &&
    leftMeasure <= 900
  ) {
    boxnum = 3;
    counterFunction();
    ifRightSequence();
  } else if (
    //SYD
    topMeasure >= 550 &&
    topMeasure <= 650 &&
    leftMeasure >= 390 &&
    leftMeasure <= 590
  ) {
    boxnum = 4;
    counterFunction();
    ifRightSequence();
  } else {
    document.getElementById("collision").innerHTML =
      "Antal ramte felter = " + count + "/8";
    document.getElementById("boxvest").style.backgroundColor = "white";
    document.getElementById("boxnord").style.backgroundColor = "white";
    document.getElementById("boxoest").style.backgroundColor = "white";
    document.getElementById("boxsyd").style.backgroundColor = "white";
    counterFunction.done = false;
  }
}
let count = 0;
let sequence = [2, 4, 2, 3, 1, 2, 1, 3];
let boxnum;

let order = [];
let orderFalsk = {
  order: [1, 2, 3],
};

localStorage.setItem("TheSequenceIs", JSON.stringify(sequence));

document.getElementById("collision").innerHTML =
  "Antal ramte felter = " + count + "/8";
function ifRightSequence() {
  if (count > sequence.length - 1) {
    console.log("det var hvad du troede var rækkefølgen");
    console.log("Du mener rækkefølgen er; " + order);
    clearInterval(timer);
  }
}

var counterFunction = function () {
  if (counterFunction.done) return;
  console.log("COUNTERFUNCTION");

  if (boxnum == 1) {
    document.getElementById("collision").innerHTML =
      "Antal ramte felter = " + (count + 1) + "/8";
    document.getElementById("boxvest").style.backgroundColor = "yellow";
    order.push(1);
  } else if (boxnum == 2) {
    document.getElementById("collision").innerHTML =
      "Antal ramte felter = " + (count + 1) + "/8";
    document.getElementById("boxnord").style.backgroundColor = "yellow";
    order.push(2);
  } else if (boxnum == 3) {
    document.getElementById("collision").innerHTML =
      "Antal ramte felter = " + (count + 1) + "/8";
    document.getElementById("boxoest").style.backgroundColor = "yellow";
    order.push(3);
  } else if (boxnum == 4) {
    document.getElementById("collision").innerHTML =
      "Antal ramte felter = " + (count + 1) + "/8";
    document.getElementById("boxsyd").style.backgroundColor = "yellow";
    order.push(4);
  }
  count++;
  counterFunction.done = true;
  if (order.length < sequence.length) {
    localStorage.setItem("WhatYouThinkIsTheOrder", JSON.stringify(order));
  }
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

let timer;
let time = 0;
function completionTimer() {
  timer = setInterval(countUp, 1000);
}

function countUp() {
  time++;
  console.log(time);
  localStorage.setItem("FinalTime", time);
}

function conLost() {
  console.log("Lost connection");
}
