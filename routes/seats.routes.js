const express = require('express');
const router = express.Router();

const SeatController = require('../controllers/seat.controllers');

router.get('/seats', SeatController.getAll);
router.get('/seats/:id', SeatController.getId);
router.post('/seats', SeatController.postId);
router.put('/seats/:id', SeatController.putId);
router.delete('/seats/:id', SeatController.deleteId);


module.exports = router;