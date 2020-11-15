<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <div title="Register">
        <form 
          name="family-app-form"
          autocomplete="off">
          <v-text-field
            label="First Name"
            v-model="firstname"
          ></v-text-field>
          <v-text-field
            label="Last Name"
            v-model="lastname"
          ></v-text-field>
          <v-text-field
            label="Email"
            v-model="email"
          ></v-text-field>
          <br>
          <v-text-field
            label="Password"
            type="password"
            v-model="password"
            autocomplete="new-password"
          ></v-text-field>
          <v-text-field
            label="Family Code"
            v-model="familyid"
          ></v-text-field>
        </form>
        <br>
        <div class="danger-alert" v-html="error" />
        <br>
        <v-btn
          dark
          class="cyan"
          @click="register">
          Register
        </v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
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
      error: null
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password,
          FamilyId: this.FamilyId,
          firstname: this.firstname,
          lastname: this.lastname
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
</style>
