const express = require('express');

const router = express.Router();
const { createTicket, getTickets, getTicketById, deleteTicket } = require('../controllers/ticketController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createTicket).get(protect, getTickets);
router.route('/:id').get(protect, getTicketById);
router.route('/:id').delete(protect, deleteTicket);

module.exports = router;
