<template>
  <v-card v-if="!$store.state.isUserLoggedIn"
    class="mx-auto"
    max-width="700"
  >
    <v-toolbar
      color="indigo darken-4"
      dark
    >
      <v-toolbar-title>Login</v-toolbar-title>
      <v-spacer></v-spacer>
      <span>New to HouseHolder?</span>
      <v-btn
        color="indigo darken-4"
        dark
        text
        v-if="!$store.state.isUserLoggedIn"
      >
        <router-link to="/register" class="router">Register here</router-link>
      </v-btn>
    </v-toolbar>
    <img class="home__img"
      src="../assets/logo_size.jpg"
    />
    <v-container>
      <div title="Login">
        <v-text-field
          label="Email"
          v-model="email"
          color="indigo darken-4"
        ></v-text-field>
        <br>
        <v-text-field
          label="Password"
          type="password"
          v-model="password"
          color="indigo darken-4"
        ></v-text-field>
        <br>
        <div class="danger-alert" v-html="error" />
        <br>
        <v-btn
          dark
          color='indigo darken-4'
          @click="login">
          Login
        </v-btn>
      </div>
    </v-container>
  </v-card>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import FamilyService from '@/services/FamilyService'
import ChoreService from '@/services/ChoreService'
import EventService from '@/services/EventService'
export default {
  name: 'Login',
  title: 'Login',
  data () {
    return {
      email: '',
      password: '',
      FamilyId: null,
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
        await this.getAssociatedFamilyMembers(this.$store.state.user.FamilyId)
        await this.getFamilyChores(this.$store.state.family)
        await this.getFamilyEvents(this.$store.state.family)
        this.$router.push('/dashboard')
      } catch (error) {
        this.error = error.response.data.error
      }
    },
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
  },
}
</script>

<style scoped lang="scss">
a {
    color: white;
  }
</style>
