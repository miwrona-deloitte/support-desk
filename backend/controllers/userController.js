const expressAsyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

// @desc Register a new user
// @route /api/users 
// @access Public
const registerUser = expressAsyncHandler(async (req, res) => {
    const {name, password, email} = req.body

    // Validation
    if (!name || !password || !email) {
        res.status(400)
        throw new Error('Please include name, password and email in body params')
    }

    // Find if user already exists
    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new error('Invalid user data')
    }
}) 

// @desc Login a user
// @route /api/users/login 
// @access Public
const loginUser = expressAsyncHandler(async (req, res) => {
    res.send('Login Route')
})

module.exports = {
    loginUser, 
    registerUser,
}