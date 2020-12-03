<template>
  <v-app>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <Footer></Footer>

  </v-app>
</template>

<script>
import Footer from '@/components/Footer'

export default {
  name: 'App',

  components: {
    Footer
  },

  data: () => ({
    drawer: false,
    mini: true
  }),
};
</script>

<style>
.v-application {
  background-color: #E6203C !important;
}
</style>
