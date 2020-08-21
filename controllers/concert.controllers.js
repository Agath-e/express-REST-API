const Concert = require('../models/concert.model');
const { uuid } = require('uuidv4');

exports.getAll = async (req, res) => {
    try {
      res.json(await Concert.find());
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };
  
  
  exports.getId = async (req, res) => {
  
    try {
      const dep = await Concert.findById(req.params.id);
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
  };
  
  exports.postId = async (req, res) => {
  
    try {
  
      const { performer, genre, price, day, image  } = req.body;
      const newConcert = new Concert({ id: uuid(), performer: performer, genre: genre, price: price, day: day, image: image });
      await newConcert.save();
      res.json({ message: 'OK' });
  
    } catch(err) {
      res.status(500).json({ message: err });
    }
  
  };
  
  exports.putId = async (req, res) => {
    const { performer, genre, price, day, image  } = req.body;
  
    try {
      const dep = await(Concert.findById(req.params.id));
      if(dep) {
        await Concert.updateOne({ _id: req.params.id }, { $set: { id: uuid(), performer: performer, genre: genre, price: price, day: day, image: image }});
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
      const dep = await(Concert.findById(req.params.id));
      if(dep) {
        await Concert.deleteOne({ _id: req.params.id });
        res.json(dep);
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
  };