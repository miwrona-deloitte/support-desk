const express = require('express');

const router = express.Router();
const { createTicket, getTickets } = require('../controllers/ticketController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createTicket).get(protect, getTickets);

module.exports = router;
