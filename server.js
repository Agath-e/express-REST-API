const express = require('express');
const db = require('./db');
const cors = require('cors')
const path = require('path');

const app = express();

// import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/client/NewWaveFest/build')));
app.use('/api', testimonialsRoutes); // add testimonials routes to server
app.use('/api', concertsRoutes); // add concerts routes to server
app.use('/api', seatsRoutes); // add seats routes to server

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/NewWaveFest/build/index.html'));
});
 
app.use((req, res) => {
  res.status(404).send('404 not found...');
})


app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});