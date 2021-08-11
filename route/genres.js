const {Genre,validate} = require('../models/genre')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    const genre = await Genre.find()
    res.send(genre)
})

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id)
    if (!genre) { res.status(404).send('The given id is invalid.') }

    res.send(genre)
})

router.post('/', async (req,res) => {
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const genre = await new Genre({name: req.body.name})
    genre.save()

    res.send(genre)

})

router.put('/:id', async (req, res) => {
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
    if (!genre) { res.status(404).send('The given id is invalid.') }

    res.send(genre)
})

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id)
    if (!genre) { res.status(404).send('The given id is invalid.') }

    res.send(genre)
})

module.exports = router
