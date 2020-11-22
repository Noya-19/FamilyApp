const AuthenticationController = require('./controllers/AuthenticationController')
const ChoresController = require('./controllers/ChoresController')
const FamilyController = require('./controllers/FamilyController')
const EventsController = require('./controllers/EventsController')

const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

module.exports = (app) => {
    app.post('/register',
        AuthenticationControllerPolicy.register,
        AuthenticationController.register)
    app.post('/login',
        AuthenticationController.login)

    app.get('/families',
        FamilyController.getFamilyUsers)
    app.post('/families',
        FamilyController.post)

    app.get('/chores',
        ChoresController.getAllByAssignedTo)
    app.post('/chores',
        ChoresController.post)

    app.get('/events',
        EventsController.getUserEvents)
    app.post('/events',
        EventsController.post)
}
