import Api from '@/services/Api'

export default {
    index (userid) {
        return Api().get('chores', {
            params: userid
        })
    },
    createChore (payload) {
        return Api().post('chores', payload)
    },
    deleteChore (choreid) {
        return Api().get('chores/delete', {
            params: choreid
        })
    }
}
