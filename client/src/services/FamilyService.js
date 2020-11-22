import Api from '@/services/Api'

export default {
    getFamilyUsers (familyid) {
        return Api.get('families', familyid)
    }
}