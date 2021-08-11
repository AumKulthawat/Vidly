const mongoose = require('mongoose')
const Joi = require('joi')

const rentalSchema = new mongoose.Schema(
    {
        customer: {
            type: new mongoose.Schema({
                name: {
                    type: String,
                    requied: true,
                    minlength: 5,
                    maxlength: 50
                },
                isGold:{
                    type: Boolean,
                    default: false
                },
                phone: {
                    type: String,
                    required: true,
                    minlength: 10,
                    maxlength: 12
                }
            }),
            required: true
        },
        movie: {
            type: new mongoose.Schema({
                title: {
                    type: String,
                    required: true,
                    trim: true,
                    maxlength: 255
                },
                dailyRentalRate: {
                    type: Number,
                    required: true,
                    max: 255
                }
            }),
            required: true
        },
        dateOut: {
            type: Date,
            required: true,
            default: Date.now
        },
        dateReturn: {
            type: Date
        },
        rentalFree: {
            type: Number,
            min: 0
        }
    },
    {
        collection: 'rentals'
    }
)

const Rental = mongoose.model('Rental', rentalSchema)

function rentalValidate(rental){
    const schema = Joi.object(
        {
            customerId: Joi.objectId() .required(),
            movieId: Joi.objectId() .required()
        }
    )
    
    return schema.validate(rental)
}

exports.rentalSchema = rentalSchema
exports.Rental = Rental
exports.validate = rentalValidate