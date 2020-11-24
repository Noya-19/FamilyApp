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
    async getFamilyChores(family) {
        try {
          family.forEach(user => {
            const response = ChoreService.index({
              UserId: user.id
            })
            response.then((value)=>{
              this.$store.dispatch('setChores', value.data)
            })
          })
        } catch (error) {
          this.error = error.response.data.error
        }
      },
}