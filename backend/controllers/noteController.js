const expressAsyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const Note = require('../models/noteModel');
const Ticket = require('../models/ticketModel');

// @desc Get notes for a ticket
// @route GET /api/tickets/:ticketId/notes
// @access Private
const getNotes = expressAsyncHandler(async (req, res) => {
    // Get user using id in the token
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    const ticket = await Ticket.findById(req.params.ticketId);
    console.log(req.params.id);
    if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const notes = await Note.find({ ticket: req.params.ticketId });
    res.status(200).json(notes);
});

// @desc Create ticket note
// @route POST /api/tickets/:ticketId/notes
// @access Private
const addNote = expressAsyncHandler(async (req, res) => {
    // Get user using id in the token
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    const ticket = await Ticket.findById(req.params.ticketId);
    console.log(req.params.id);
    if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const note = await Note.create({
        text: req.body.text,
        isStaff: false,
        ticket: req.params.ticketId,
        user: req.user.id,
    });

    res.status(200).json(note);
});

module.exports = {
    getNotes,
    addNote,
};
