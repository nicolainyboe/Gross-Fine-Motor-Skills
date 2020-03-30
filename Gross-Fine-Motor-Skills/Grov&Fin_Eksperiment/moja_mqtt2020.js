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
  console.log("sending");
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
  console.log(topMeasure);
  let leftMeasure = parseInt(ball.style.left, 10);
  //VEST

  if (
    topMeasure >= 350 &&
    topMeasure <= 460 &&
    leftMeasure >= 40 &&
    leftMeasure <= 230
  ) {
    boksenDuRammer = 1;
    ifRightFunctionEvent(1);
  } else {
    boxvest.style.backgroundColor = "white";
  }

  //NORD width: 150px;height: 70px;left: 410px;top: 40px;
  if (
    topMeasure >= 40 &&
    topMeasure <= 150 &&
    leftMeasure >= 410 &&
    leftMeasure <= 600
  ) {
    boksenDuRammer = 2;
    ifRightFunctionEvent(2);
  } else {
    boxnord.style.backgroundColor = "white";
  }
  // OEST width: 150px;height: 70px;left: 760px;top: 350px;
  if (
    topMeasure >= 350 &&
    topMeasure <= 460 &&
    leftMeasure >= 760 &&
    leftMeasure <= 950
  ) {
    boksenDuRammer = 3;
    ifRightFunctionEvent(3);
  } else {
    boxoest.style.backgroundColor = "white";
  }
  //SYD left: 410px; top: 640px; height: 70px; width:150px;
  if (
    topMeasure >= 640 &&
    topMeasure <= 750 &&
    leftMeasure >= 410 &&
    leftMeasure <= 600
  ) {
    boksenDuRammer = 4;
    ifRightFunctionEvent(4);
  } else {
    boxsyd.style.backgroundColor = "white";
  }
}

let counter = 0;
let order = [2, 4, 2, 1, 2, 4, 1, 3];
function ifRightFunctionEvent(e) {
  console.log(counter);
  for (i = 0; i < order.length; i++) {
    if (e == order[counter]) {
      console.log("jeg rammer rig");
      counter++;
      if (boksenDuRammer == 1) {
        console.log("jeg ramte rigtigt");
        boxvest.style.backgroundColor = "green";
      } else if (boksenDuRammer == 2) {
        boxnord.style.backgroundColor = "green";
      } else if (boksenDuRammer == 3) {
        boxoest.style.backgroundColor = "green";
      } else if (boksenDuRammer == 4) {
        boxsyd.style.backgroundColor = "green";
      }
      //Hvis du ikke rammer rigtig skal den starte forfra, og eventuelt resette counter til 0
      // Og hvis array order.length er større en længden = færdig eller order[counter] er større en indholdet så er du færdig
      console.log("boksen du rammer blinker grøn");
    } else {
      //counter = 0;
      //boxsyd.style.backgroundColor = "red";
    }
  }
}

function conLost() {
  console.log("Lost connection");
}
