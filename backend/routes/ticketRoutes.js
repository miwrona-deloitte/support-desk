const express = require('express');

const router = express.Router();
const {
    createTicket,
    getTickets,
    getTicketById,
    deleteTicket,
    updateTicket,
} = require('../controllers/ticketController');
const { protect } = require('../middleware/authMiddleware');

const noteRouter = require('./noteRoutes');
router.use('/:ticketId/notes', noteRouter);

router.route('/').post(protect, createTicket).get(protect, getTickets);
router.route('/:id').get(protect, getTicketById).delete(protect, deleteTicket).put(protect, updateTicket);

module.exports = router;
