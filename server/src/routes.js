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
<<<<<<< HEAD
=======
    app.get('/chores/delete',
        ChoresController.delete)
>>>>>>> 9bfaac7193cea24725499120499faa8e30750dff
    app.post('/chores',
        ChoresController.post)

    app.get('/events',
        EventsController.getUserEvents)
<<<<<<< HEAD
=======
    app.get('/events/delete',
        EventsController.delete)
>>>>>>> 9bfaac7193cea24725499120499faa8e30750dff
    app.post('/events',
        EventsController.post)
}
