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
        return Api().delete('chores/delete', {
            params: choreid
        })
    },
    updateChore (payload) {
        return Api().get('chores/update', {
            params: payload
        })
    }
}
