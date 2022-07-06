const expressAsyncHandler = require('express-async-handler')

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
    res.send('Register Route')
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