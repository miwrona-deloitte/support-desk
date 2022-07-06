const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Give me the name'],
    },
    email: {
        type: String,
        required: [true, 'Give me the email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Give me the password'],
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    }
},
{
    timestamps: true,
}
)

module.exports = mongoose.model('User', userSchema)