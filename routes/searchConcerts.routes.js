const express = require('express');
const router = express.Router();

const SearchConcertController = require('../controllers/searchConcert.controllers');

router.get('concerts/performer/:performer', SearchConcertController.getPerformer);
router.get('/concerts/genre/:genre', SearchConcertController.getGenre);
router.get('/concerts/price/:price_min/:price_max', SearchConcertController.getPrice);
router.get('/concerts/price/day/:day', SearchConcertController.getDay);

module.exports = router;
