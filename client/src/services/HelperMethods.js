export default {
    async getAssociatedFamilyMembers(familyid) {
        try {
          const response = await FamilyService.getFamilyUsers({
            FamilyId: familyid
          })
          this.$store.dispatch('setFamily', response.data)
          //this.$store.state.family.forEach(user => console.log(user.id)) print out all user ids in the family
        } catch (error) {
          this.error = error.response.data.error
        }
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
    async getFamilyEvents(family) {
        try {
          family.forEach(user => {
            const response = EventService.index({
              UserId: user.id
            })
            response.then((value)=>{
              this.$store.dispatch('setEvents', value.data)
            })
          })
        } catch (error) {
          this.error = error.response.data.error
        }
    }

}