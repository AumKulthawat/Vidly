const mongoose = require('mongoose')
const Joi = require('joi')

// For setting password complexity we can use tool name: joi-password-complexity

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            requied: true,
            minlength: 5,
            maxlength: 50
        },
        email: {
            type: String,
            required: true,
            unique: true,
            minlength: 5,
            maxlength: 255
        },
        password: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 255
        }
    },
    {
        collection: 'users'
    }
)

const User = mongoose.model('User', userSchema)

function userValidate(user) {
    const schema = Joi.object({
        name: Joi.string() .min(5) .max(50) .required(),
        email: Joi.string() .min(5) .max(255) .required().email(),
        password: Joi.string() .min(5) .max(255) .required()
    })
    
    return schema.validate(user)
}

exports.User = User
exports.validate = userValidate