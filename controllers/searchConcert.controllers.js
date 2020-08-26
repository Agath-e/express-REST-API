const SearchConcert = require('../models/concert.model');


exports.getPerformer = async (req, res) => {
  
    try {
      const conc = await Concert.find({ performer: req.params.performer });
      if(!conc.length) res.status(404).json({ message: 'Not found' });
      else res.json(conc);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
};

exports.getGenre = async (req, res) => {
  
    try {
      const conc = await Concert.find({ genre: req.params.genre });
      if(!conc.length) res.status(404).json({ message: 'Not found' });
      else res.json(conc);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
};

exports.getPrice = async (req, res) => {
  
    try {
      const conc = await Concert.find({ $and: [{ price: { $gte: req.params.price_min } }, { price: { $lte: req.params.price_max } }] });
      if(!conc) res.status(404).json({ message: 'Not found' });
      else res.json(conc);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
};

exports.getDay = async (req, res) => {
  
    try {
      const conc = await Concert.find({ day: req.params.day });
      if(!conc.length) res.status(404).json({ message: 'Not found' });
      else res.json(conc);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
};