const expressAsyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');

// @desc Get user tickets
// @route GET /api/tickets
// @access Private
const getTickets = expressAsyncHandler(async (req, res) => {
    // Get user using id in the token
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    const tickets = await Ticket.find({ user: req.user.id });

    res.status(200).json(tickets);
});

// @desc Create a new ticket
// @route POST /api/tickets
// @access Public
const createTicket = expressAsyncHandler(async (req, res) => {
    const { product, description } = req.body;

    if (!product || !description) {
        res.status(400);
        throw new Error('Please add product and the description');
    }
    const ticket = await Ticket.create({
        user: req.user.id,
        product,
        description,
        status: 'new',
    });
    res.status(201).json(ticket);
});

module.exports = { createTicket, getTickets };
