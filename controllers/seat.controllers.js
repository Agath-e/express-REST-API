const Seat = require('../models/seat.model');
const { uuid } = require('uuidv4');

exports.getAll = async (req, res) => {
    try {
      res.json(await Seat.find());
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };
  

  exports.getId = async (req, res) => {
  
    try {
      const dep = await Seat.findById(req.params.id);
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
  };
  
  exports.postId = async (req, res) => {
  
    try {
  
      const { day, seat, client, email } = req.body;
      const newSeat = new Seat({ id: uuid(), day: day, seat: seat, client: client, email: email });
      await newSeat.save();
      res.json({ message: 'OK' });
  
    } catch(err) {
      res.status(500).json({ message: err });
    }
  
  };
  
  exports.putId = async (req, res) => {
    const { day, seat, client, email } = req.body;
  
    try {
      const dep = await(Seat.findById(req.params.id));
      if(dep) {
        await Seat.updateOne({ _id: req.params.id }, { $set: { id: uuid(), day: day, seat: seat, client: client, email: email }});
        res.json(dep);
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
  };
  
  exports.deleteId = async (req, res) => {
  
    try {
      const dep = await(Seat.findById(req.params.id));
      if(dep) {
        await Seat.deleteOne({ _id: req.params.id });
        res.json(dep);
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
  };