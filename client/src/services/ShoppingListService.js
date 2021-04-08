import Api from '@/services/Api'

export default {
    index (familyid) {
        return Api().get('shoppinglist/items', {
            params: familyid
        })
    },
    createItem (payload) {
        return Api().post('shoppinglist/items', payload)
    },

    createRecipe (payload) {
        return Api().post('shoppinglist/recipes', payload)
    }
}