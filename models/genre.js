const mongoose = require('mongoose')
const Joi = require('joi')

const genreSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 255
        }
    },
    {
        collection: 'Genres'
    }
)

const Genre = mongoose.model('Genres', genreSchema)

function validateGenre(genre) {
    const schema = Joi.object(
        {
            name: Joi.string().min(5).required()
        }
    )

    return schema.validate(genre)
}

exports.genreSchema = genreSchema
exports.Genre = Genre
exports.validate = validateGenre