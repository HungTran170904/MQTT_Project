import express from "express";
import mqtt from "mqtt";

const app=express();

const port=3000
const topic="weather/temperature"

// Create an MQTT client
const options = {
    host: '192.168.153.131',
    port: 8883,
    protocol: 'mqtts',
    rejectUnauthorized: false,
    username: 'mobile1',
    password: 'mobile1'
};

// Create an MQTT client
const client = mqtt.connect(options);

// Handle MQTT connection
client.on('connect', () => {
    console.log('Consumer connects to MQTT broker');
    client.subscribe(topic,{ qos: 2} ,(err) => {
        if (!err) {
            console.log(`Consumer subscribes to topic: ${topic}`);
        }
        else console.log("Unable to subscribe", err);
    });
});

client.on("message",(topic, payload)=>{
    console.log(`Receive message '${payload}' on topic '${topic}'`);
});

app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
});
