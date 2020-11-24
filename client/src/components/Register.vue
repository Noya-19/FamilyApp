<template>
  <v-layout column v-if="!$store.state.isUserLoggedIn">
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
          <v-radio-group row v-model="creatingNewFamily" class="justify-center">
              <v-radio value="true" label="Yes"></v-radio>
              <v-radio value="false" label="No"></v-radio>
          </v-radio-group>
          <v-text-field
            v-if="!creatingNewFamily"
            label="Family Code"
            v-model="FamilyId"
          ></v-text-field>
        </form>
        <br>
        <div class="danger-alert" v-html="error" />
        <br>
        <v-btn
          dark
          @click="register">
          Register
        </v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import FamilyService from '@/services/FamilyService'
import ChoreService from '@/services/ChoreService'
import EventService from '@/services/EventService'
import HelperMethods from '@/services/HelperMethods'
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
      creatingNewFamily: true,
      error: null
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password,
          creatingNewFamily: this.creatingNewFamily,
          FamilyId: this.FamilyId,
          firstname: this.firstname,
          lastname: this.lastname
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        await HelperMethods.getAssociatedFamilyMembers(this.$store.state.user.FamilyId)
        await HelperMethods.getFamilyChores(this.$store.state.family)
        await HelperMethods.getFamilyEvents(this.$store.state.family)
      } catch (error) {
        this.error = error.response.data.error
      }
    },
  }
}
</script>

<style scoped lang="scss">
</style>
