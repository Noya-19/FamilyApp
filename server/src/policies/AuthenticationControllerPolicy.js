const Joi = require('joi')

module.exports = {
    register (req, res, next) {
        const schema = Joi.object({
            email: Joi.string().email(),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{8,32}$')
<<<<<<< HEAD
<<<<<<< Updated upstream
            )
=======
=======
>>>>>>> 77f015ff5cdd211a053c8888cfc299b15c244db9
            ),
            // FamilyId: Joi.string().regex(
            //     new RegExp('^[a-zA-Z0-9]{8}$')
            // ),
<<<<<<< HEAD
            FamilyId: Joi.number().integer(),
            firstname: Joi.string(),
            lastname: Joi.string()
>>>>>>> Stashed changes
=======
            FamilyId: Joi.number(),
            firstname: Joi.string(),
            lastname: Joi.string()
>>>>>>> 77f015ff5cdd211a053c8888cfc299b15c244db9
        })
        // WORKING WITH DEPRECATED VERSION
        //                   = Joi.validate(req.body, schema);
        const {error, value} = schema.validate(req.body);
        if (error) {
            switch (error.details[0].context.key) {
                case 'email':
                    res.status(400).send({
                        error: 'You must provide a valid email address.'
                    })
                    break
                case 'password':
                    res.status(400).send({
                        error: `The password must include:
                            <br>
                            1. It must contain ONLY the following characters: lower case, upper case, numerics.
                            <br>
                            2. It must be at least 8 characters in length and not greater than 32 characters in length.`
                            
                    })
                    break
                case 'FamilyId':
                    res.status(400).send({
                         error: 'You must provide a valid family code.'
                    })
                    break
                case 'firstname':
                    res.status(400).send({
                        error: 'Invalid first name.'
                })
                    break
                case 'lastname':
                    res.status(400).send({
                        error: 'Invalid last name.'
                    })
                    break
                default:
                    res.status(400).send({
                        error: 'Invalid registration information.'
                    })
            }
        } else {
            next()
        }
    }
}