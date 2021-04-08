const AuthenticationController = require('./controllers/AuthenticationController')
const ChoresController = require('./controllers/ChoresController')
const FamilyController = require('./controllers/FamilyController')
const EventsController = require('./controllers/EventsController')
const ShoppingListController = require('./controllers/ShoppingListController')


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
    app.delete('/chores/delete',
        ChoresController.delete)
    app.post('/chores',
        ChoresController.post)
    app.get('/chores/update',
        ChoresController.updateChore)

    app.get('/events',
        EventsController.getUserEvents)
    app.get('/events/delete',
        EventsController.delete)
    app.post('/events',
        EventsController.post)

    app.get('/shoppinglist/items',
        ShoppingListController.getFamilyItems)
    app.post('/shoppinglist/items',
        ShoppingListController.postItem)
    app.post('/shoppinglist/recipes',
        ShoppingListController.postRecipe)
}
