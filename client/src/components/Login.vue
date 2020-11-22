<template>
  <v-layout column v-if="!$store.state.isUserLoggedIn">
    <v-flex xs6 offset-xs3>
      <div title="Login">
        <v-text-field
          label="Email"
          v-model="email"
        ></v-text-field>
        <br>
        <v-text-field
          label="Password"
          type="password"
          v-model="password"
        ></v-text-field>
        <br>
        <div class="danger-alert" v-html="error" />
        <br>
        <v-btn
          dark
          class="cyan"
          @click="login">
          Login
        </v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import FamilyService from '@/services/FamilyService'
export default {
  name: 'Login',
  title: 'Login',
  data () {
    return {
      email: '',
      password: '',
      error: null,
      family: [],
      chores: [],
      events: [],
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        // getAssociatedFamilyMember()
        // getFamilyChores()
        // getFamilyEvents()
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async getAssociatedFamilyMembers(familyid) {
      try {
        const response = await FamilyService({
          // get list of users
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async getFamilyChores(family) {
      try {
        /*
          1. Loop through family array
          2. For each user in family:
            -call Chore API to obtain list of chores
            -push each chore to chores[]
          3. update Vuex store's chores[]
        */
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
</style>