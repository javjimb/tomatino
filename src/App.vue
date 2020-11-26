<template>
  <v-app>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer
        app
        padless
    >
      <v-divider></v-divider>
      <v-card
          flat
          tile
          width="100%"
          class="footer text-center"
      >
        <v-card-text class="pa-0">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  v-show="$route.name !== 'settings'"
                  class="mx-4"
                  icon
                  to="/settings"
                  v-bind="attrs"
                  v-on="on"
              >
                <v-icon size="24px">
                  mdi-cog
                </v-icon>
              </v-btn>
            </template>
            <span>Settings</span>
          </v-tooltip>

          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  v-show="$route.name !== 'timer'"
                  class="mx-4"
                  icon
                  to="/"
                  v-bind="attrs"
                  v-on="on"
              >
                <v-icon size="24px">
                  mdi-clock
                </v-icon>
              </v-btn>
            </template>
            <span>Timer</span>
          </v-tooltip>

        </v-card-text>



      </v-card>
    </v-footer>

  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
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
.footer {
  background-color: #cf1731 !important;
}
</style>
