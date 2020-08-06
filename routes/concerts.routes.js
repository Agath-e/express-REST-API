const express = require('express');
const router = express.Router();
const db = require('../db');

const { uuid } = require('uuidv4');

// get all concerts
router.route('/concerts').get((req, res) => {
  res.json(db.concerts);;
});


router.route('/concerts/:id').get((req, res) => {
  res.json(db.concerts.filter(item => item.id == req.params.id));
});
  
  
router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day, image } = req.body
  const payload = {
    id: uuid(),
    performer: performer,
    genre: genre,
    price: price,
    day: day,
    image: image,
  };
  db.push(payload);
  res.json({message: 'OK'});
});
  
router.route('/concerts/:id').put((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  
  const changedConcerts = {
    id: req.params.id, 
    performer: performer,
    genre: genre,
    price: price,
    day: day,
    image: image,
  }
  
  const opinion = db.concerts.filter(item => item.id == req.params.id);
  const index = db.concerts.indexOf(opinion);
  db[index] = changedConcerts;
  res.json({message: 'OK'});
});
  
router.route('/concerts:id').delete((req, res) => {
  const opinion = db.concerts.filter(item => item.id == req.params.id);
  const index = db.concerts.indexOf(opinion);
  db.splice(index, 1);
  
  res.json({message: 'OK'});
});


module.exports = router;