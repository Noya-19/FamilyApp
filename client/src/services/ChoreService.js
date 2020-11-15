import Api from '@/services/Api'

export default {
<<<<<<< HEAD
    index (userid) {
        return Api.get('chores', userid)
=======
    index () {
        return Api.get('chores')
>>>>>>> 77f015ff5cdd211a053c8888cfc299b15c244db9
    }
}
