import Api from '@/common/api.service'

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
    return Api().get('events/delete', {
      params: eventid
    })
  }
}
