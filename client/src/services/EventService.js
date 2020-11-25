import Api from '@/services/Api'

export default {
    index (userid) {
        return Api().get('events', {
            params: userid
        })
    },
    createEvent (payload) {
        return Api().post('events', payload)
    },
    deleteEvent (eventid) {
        return Api().get('event/delete', {
            params: eventid
        })
    }
}