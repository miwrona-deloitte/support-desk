const expressAsyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');

// @desc Create a new ticket
// @route POST /api/tickets
// @access Public
const createTicket = expressAsyncHandler(async (req, res) => {
    res.status(200).json({ message: 'create ticket' });

    // const ticket = await Ticket.create();
});

// @desc Get user tickets
// @route GET /api/tickets
// @access Private
const getTickets = expressAsyncHandler(async (req, res) => {
    res.status(200).json({ message: 'getTickets' });
});

module.exports = { createTicket, getTickets };
