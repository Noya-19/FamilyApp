import Api from '@/services/Api'

export default {
    index (userid) {
        return Api.get('chores', userid)
    }
}
