import Api from '@/services/Api'

export default {
    index (familyid) {
        return Api().get('shoppinglist/items', {
            params: familyid
        })
    },
    deleteItem (payload){
        return Api().delete('shoppinglist/items', {params: payload})
    },
    createItem (payload) {
        return Api().post('shoppinglist/items', payload)
    },
    updateItem (payload) {
        return Api().get('shoppinglist/items/update', {
            params: payload
        })
    },

    indexRecipes (familyid) {
        return Api().get('shoppinglist/recipes', {
            params: familyid
        })
    },
    createRecipe (payload) {
        return Api().post('shoppinglist/recipes', payload)
    },
    deleteRecipe (payload){
        return Api().delete('shoppinglist/recipes', {params: payload})
    },
    updateRecipes (payload) {
        return Api().get('/shoppinglist/recipes/update', {
            params: payload
        })
    },
}