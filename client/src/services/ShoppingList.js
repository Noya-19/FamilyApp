import Api from '/@services/Api'

export default {
    createItem (payload) {
        return Api().post('shoppinglist/items', payload)
    }
}