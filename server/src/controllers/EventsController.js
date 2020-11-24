const {Event} = require('../models')

module.exports = {
    async getUserEvents (req, res) {
        try {
            const userid = req.query.UserId
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