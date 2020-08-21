const express = require('express');
const router = express.Router();

const ConcertController = require('../controllers/concert.controllers');

router.get('/concerts', ConcertController.getAll);
router.get('/concerts/:id', ConcertController.getId);
router.post('/concerts', ConcertController.postId);
router.put('/concerts/:id', ConcertController.putId);
router.delete('/concerts/:id', ConcertController.deleteId);


module.exports = router;
  
