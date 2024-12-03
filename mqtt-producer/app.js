import express from "express";
import mqtt from "mqtt";

const app=express();

const port=3001

// Create an MQTT client
const options = {
    host: '192.168.153.131',
    port: 8883,
    protocol: 'mqtts',
    protocolVersion: 5,
    rejectUnauthorized: false,
    username: 'temSensor1',
    password: 'temSensor1'
};
    
const client = mqtt.connect(options);

// Handle MQTT connection
client.on('connect', () => {
    console.log('Producer connects to MQTT broker');
});

// Handle MQTT errors
client.on('error', (err) => {
          console.error('Connection error: ', err);
});

app.post("/publish", (req, res)=>{
          const qosNum = parseInt(req.query["qos"]);
          const message = req.query["message"];
          const topic = req.query["topic"];
          client.publish(topic,message, { qos: qosNum, retain: true}, (err) => {
                    if (err) {
                        console.log('Failed to publish message');
                        return res.status(400).send(`Unable to send message ${topic}`);
                    } else {
                        console.log(`Message published: ${message}`);
                        return res.status(200).send(`Publish message successfully to topic ${topic}`);
                    }
          });
});

app.listen(port, () => {
          console.log(`Express app listening at http://localhost:${port}`);
});
