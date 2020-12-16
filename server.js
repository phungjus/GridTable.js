/* server.js - Express server*/
'use strict';
const log = console.log

const express = require('express')
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '/pub')))

app.get('/', (req, res) => {

	res.send(path.join(__dirname) + '/pub/landingpage.html')

})

app.get('/examples', (req, res) => {

	res.send(path.join(__dirname) + '/pub/examples.html')

})

app.get('/documentation', (req, res) => {

	res.send(path.join(__dirname) + '/pub/documentation.html')

})

const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
})

