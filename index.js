const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const gpio = require('rpi-gpio');
const port = 5000;
const PIN = 7;
gpio.setup(PIN,gpio.DIR_OUT);

// MIDDLEWARE
app.use(bodyParser.json());
app.use(cors());
//ROUTES
app.get('/', (req,res) => {
	//res.send('Hello There');
	res.sendFile(__dirname+'/index.html');
} );

app.post('/led/on', (req,res) => {
	gpio.write(PIN,true, function(err) {
		if(err) throw err;
		console.log('LED IS ON, WRITTEN TRUE TO PIN');
		var time = new Date();
		console.log('TIMESTAMP: ','HOURS: ',time.getHours(),'MINUTES: ',time.getMinutes(),'SECONDS: ',time.getSeconds());
		res.send({status: 'ON', time: time});
		return;
	});
} );
app.post('/led/off', (req,res) => {
	gpio.write(PIN,false, function(err) {
		if(err) throw err;
		console.log('LED IS OFF, WRITTEN FALSE TO PIN');
		var time = new Date();
		console.log('TIMESTAMP: ','HOURS: ',time.getHours(),'MINUTES: ',time.getMinutes(),'SECONDS: ',time.getSeconds());
		res.send({status: 'OFF', time: time});
		return;
	});
} );


app.listen(port, () => console.log(`Listening on port ${port}`));