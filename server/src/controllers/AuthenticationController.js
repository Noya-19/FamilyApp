const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}

module.exports = {
    async register (req, res) {
        try {
            const creatingNewFamily = req.body
            const user = await User.create(req.body)
            const userJson = user.toJSON()
            if (!creatingNewFamily) {
                const {familyid} = req.body
                const familyCheck = await Family.findOne({
                    where: {
                        id: familyid
                    }
                })
                if (!familyCheck) {
                    return res.status(403).send({
                        error: 'Error finding family.'
                    })
                } else {
                    familyCheck.add(user)
                }
            } else {
                const family = await Family.create(req.body)
                res.send(family)
                family.add(user)
            }
            res.send({
                user: userJson,
                token: jwtSignUser(userJson)
            })
        } catch (err) {
            res.status(400).send({
                error: 'This email is already in use.'
            })
            // email already exists
        }
    },
    async login (req, res) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            if (!user) {
                return res.status(403).send({
                    error: 'The login information was incorrect.'
                })
            }

            const isPasswordValid = await user.comparePassword(password)
            if (!isPasswordValid) {
                return res.status(403).send({
                    error: 'The login information was incorrect.'
                })
            }

            const userJson = user.toJSON()
            res.send({
                user: userJson,
                token: jwtSignUser(userJson)
            })
        } catch (err) {
            res.status(500).send({
                error: 'An error has occurred trying to log in.'
            })
        }
    }
}