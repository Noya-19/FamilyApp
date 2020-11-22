const {Event} = require('../models')
const User = require('../models/User')

module.exports = {
    async getUserEvents (req, res) {
        try {
            const userid = req.body.UserId
            const events = await Event.findAll({
                where: {
                    UserId: userid
                }
            })
            res.send(events)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occurred while fetching events.'
            })
        }
    },
    async post (req, res) {
        try {
            const event = await Event.create(req.body)
            res.send(event)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occurred while creating the event.'
            })
        }
    },
}