<template>
  <v-card v-if="!$store.state.isUserLoggedIn" class="mx-auto" max-width="700">
    <v-toolbar color="indigo darken-4" dark>
      <v-toolbar-title>Register</v-toolbar-title>
      <v-spacer></v-spacer>
      <span>Already an existing user?</span>
      <v-btn
        color="indigo darken-4"
        dark
        text
        v-if="!$store.state.isUserLoggedIn"
      >
        <router-link to="/login">Login</router-link>
      </v-btn>
    </v-toolbar>
    <img class="home__img" src="../assets/logo_size.jpg" />
    <v-container>
      <div title="Register">
        <form name="family-app-form" autocomplete="off">
          <v-text-field
            label="First Name"
            v-model="firstname"
            color="indigo darken-4"
          ></v-text-field>
          <v-text-field
            label="Last Name"
            v-model="lastname"
            color="indigo darken-4"
          ></v-text-field>
          <v-text-field
            label="Email"
            v-model="email"
            color="indigo darken-4"
          ></v-text-field>
          <br />
          <v-text-field
            label="Password"
            type="password"
            v-model="password"
            autocomplete="new-password"
            color="indigo darken-4"
          ></v-text-field>
          <v-switch
            v-model="joinExistingFamily"
            :label="'Join existing family'"
            color="indigo lighten-1"
            default="false"
          ></v-switch>
          <v-text-field
            v-if="joinExistingFamily"
            label="Family Code"
            v-model="FamilyId"
            color="indigo darken-4"
          ></v-text-field>
        </form>
        <br />
        <div class="danger-alert" v-html="error" />
        <br />
        <v-btn dark color="indigo darken-4" @click="register">
          Register
        </v-btn>
      </div>
    </v-container>
  </v-card>
</template>

<script>
import { REGISTER } from '@/store/actions.type'
import FamilyService from '@/services/FamilyService'
import ChoreService from '@/services/ChoreService'
import EventService from '@/services/EventService'
export default {
  name: 'Register',
  title: 'Register',
  data () {
    return {
      email: '',
      password: '',
      FamilyId: '',
      firstname: '',
      lastname: '',
      joinExistingFamily: '',
      creatingNewFamily: true,
      error: null
    }
  },
  methods: {
    async register () {
      if (this.creatingNewFamily !== true) this.FamilyId = -1
      try {
        const response = await this.$store.dispatch(REGISTER, {
          email: this.email,
          password: this.password,
          creatingNewFamily: !this.joinExistingFamily,
          familyid: parseInt(this.FamilyId),
          firstname: this.firstname,
          lastname: this.lastname
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        await this.getAssociatedFamilyMembers(this.$store.state.user.FamilyId)
        await this.getFamilyChores(this.$store.state.family)
        await this.getFamilyEvents(this.$store.state.family)
        this.$router.push('/dashboard')
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async getAssociatedFamilyMembers (familyid) {
      try {
        const response = await FamilyService.getFamilyUsers({
          FamilyId: familyid
        })
        this.$store.dispatch('setFamily', response.data)
        // this.$store.state.family.forEach(user => console.log(user.id)) print out all user ids in the family
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async getFamilyChores (family) {
      try {
        family.forEach(user => {
          const response = ChoreService.index({
            UserId: user.id
          })
          response.then(value => {
            this.$store.dispatch('setChores', value.data)
          })
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async getFamilyEvents (family) {
      try {
        family.forEach(user => {
          const response = EventService.index({
            UserId: user.id
          })
          response.then(value => {
            this.$store.dispatch('setEvents', value.data)
          })
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped lang="scss">
a,
span {
  color: white;
}
</style>
