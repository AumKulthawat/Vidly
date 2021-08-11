const mongoose = require('mongoose')
const Joi = require('joi')

const customerSchema = new mongoose.Schema(
    {
        isGold: {
            type: Boolean,
            default: false
        },
        name: {
            type: String,
            required: true,
            maxlength: 255
        },
        phone: {
            type: String,
            required: true,
            maxlength: 50,
            minlength: 5
        }
    },
    {
        collection: 'customers'
    }
)

const Customer = mongoose.model('Customer', customerSchema)

function customerValidation(customer) {
    const schema = Joi.object({
        name: Joi.string().max(255).required(),
        isGold: Joi.boolean(),
        phone: Joi.string().min(5).max(50).require()
    })

    return schema.validate(customer)
}

exports.customerSchema = customerSchema
exports.Customer = Customer
exports.validate = customerValidation