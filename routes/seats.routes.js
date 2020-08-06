const express = require('express');
const router = express.Router();
const db = require('../db');

const { uuid } = require('uuidv4');

// get all seats
router.route('/seats').get((req, res) => {
  res.json(db.seats);;
});

   
router.route('/seats/:id').get((req, res) => {
  res.json(db.seats.filter(item => item.id == req.params.id));
});
  
  
router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body
  const payload = {
    id: uuid(),
    day: day,
    seat: seat,
    client: client,
    email: email,
  };
  db.push(payload);
  res.json({message: 'OK'});
});
  
router.route('/seats/:id').put((req, res) => {
  const { day, seat, client, email } = req.body;
  
  const changedSeats = {
    id: req.params.id, 
    day: day,
    seat: seat,
    client: client,
    email: email,
  }
  
  const opinion = db.seats.filter(item => item.id == req.params.id);
  const index = db.seats.indexOf(opinion);
  db[index] = changedSeats;
  res.json({message: 'OK'});
});
  
router.route('/seats:id').delete((req, res) => {
  const opinion = db.seats.filter(item => item.id == req.params.id);
  const index = db.seats.indexOf(opinion);
  db.splice(index, 1);

  res.json({message: 'OK'});
});


module.exports = router;