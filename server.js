const express = require('express');
//const db = require('./db');
const cors = require('cors')
const path = require('path');
const socket = require('socket.io')
const mongoose = require('mongoose');
const helmet = require('helmet');
require('dotenv').config()

const app = express();


// import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(helmet());
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use('/api', testimonialsRoutes); // add testimonials routes to server
app.use('/api', concertsRoutes); // add concerts routes to server
app.use('/api', seatsRoutes); // add seats routes to server

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});
 
app.use((req, res) => {
  res.status(404).send('404 not found...');
})

// connects our backend code with the database
//(process.env.NODE_ENV === 'production')
mongoose.connect(`mongodb+srv://${process.env.user}:${process.env.pass}@cluster0.vnu2y.gcp.mongodb.net/NewWaveDB?retryWrites=true&w=majority`, { useNewUrlParser: true })
//: mongoose.connect('mongodb://localhost:27017/NewWaveDB', { useNewUrlParser: true, useUnifiedTopology: true });


const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));




const server = app.listen(process.env.PORT || process.env.NODE_ENV || 9000, () => {
  console.log('Server is running on port: 9000');
});

module.exports = server;

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New socket!');
});

