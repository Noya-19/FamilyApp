import Api from '@/common/api.service'

export default {
  getFamilyUsers (familyid) {
    return Api().get('families', {
      params: familyid
    })
  }
}
