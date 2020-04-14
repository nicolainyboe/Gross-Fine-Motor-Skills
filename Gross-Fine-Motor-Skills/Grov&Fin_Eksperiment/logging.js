// SETUP MQTT ------------------------------------------

const broker = "influx.itu.dk";
const port = 9002;
const secured = true;
const data = "ituF2020/EXPD/logging";

const myID = "id" + parseInt(Math.random() * 100000, 10);

// CONNECT ----------------------------------------------
//Ball Inputs

let mqttClient = new Paho.MQTT.Client(broker, port, myID);

mqttClient.connect({ onSuccess: onConnect, useSSL: secured });
mqttClient.onConnectionLost = conLost;
mqttClient.onMessageArrived = receiveMessage;

// MQTT Handler functions--------------------------------

function onConnect() {
  console.log("Connected");
  mqttClient.subscribe(data);
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
  localStorage.setItem("order", receivedMessage);
  //console.log(mUnpack);
  //do stuff with the message
  //console.log(receivedMessage.sendX);
  //console.log(receivedMessage.sendY);
}

function conLost() {
  console.log("Lost connection");
}
