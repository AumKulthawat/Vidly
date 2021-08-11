const {Customer, validate} = require('../models/customer')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

router.get('/', async (req,res) => {
    const customer = await Customer.find()

    res.send(customer)
})

router.get('/:id', async (req, res) =>{
    const customer = await Customer.findById(req.params.id)
    if(!customer) res.status(404).send('Your customer ID is not available...')

    res.status(200).send(customer)
})

router.post('/', async (req,res) => {
    const {error} = validate(req.body)
    if(error) res.status(400).send(error.details[0].message)

    const customer = await new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    })

    customer.save()
    res.status(200).send(customer)
})

router.put('/:id', async(req,res) =>{
    const {error} = validate(req.body)
    if(error) res.status(400).send(err.details[0].message)

    const customer = await Customer.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone
        },
        {
            new: true
        }
    )
    if(!customer) res.status(404).send("Your customer ID is not available, please re-check...")

    res.send(customer)
})

router.delete('/:id', async (req,res) =>{
    const customer = await Customer.findByIdAndRemove(req.params.id)
    if(!customer) res.status(404).send("Your customer ID is not available, please re-check...")

    res.send(customer)
})

module.exports = router