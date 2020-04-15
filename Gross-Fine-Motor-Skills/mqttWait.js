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

  //Farv boksene
}
let count = -1;
let sequence = [2, 4, 2, 3, 1, 2, 1];
let boxnum;

function conLost() {
  console.log("Lost connection");
}
