const Testimonial = require('../models/testimonial.model');
const { uuid } = require('uuidv4');

exports.getAll = async (req, res) => {
    try {
      res.json(await Testimonial.find());
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };
  
  exports.getRandom = async (req, res) => {
  
    try {
      const count = await Testimonial.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const dep = await Testimonial.findOne().skip(rand);
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };
  
  exports.getId = async (req, res) => {
  
    try {
      const dep = await Testimonial.findById(req.params.id);
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
  };
  
  exports.postId = async (req, res) => {
  
    try {
  
      const { author, text } = req.body;
      const newTestimonial = new Testimonial({ id: uuid(), author: author, text: text });
      await newTestimonial.save();
      res.json({ message: 'OK' });
  
    } catch(err) {
      res.status(500).json({ message: err });
    }
  
  };
  
  exports.putId = async (req, res) => {
    const { author, text } = req.body;
  
    try {
      const dep = await(Testimonial.findById(req.params.id));
      if(dep) {
        await Testimonial.updateOne({ _id: req.params.id }, { $set: { id: uuid(), author: author, text: text }});
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
      const dep = await(Testimonial.findById(req.params.id));
      if(dep) {
        await Testimonial.deleteOne({ _id: req.params.id });
        res.json(dep);
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
  };