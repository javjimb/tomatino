import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#798897',
        secondary: '#9A6B72',
        accent: '#E6203C',
        error: '#FF5252',
        info: '#00C1FF',
        success: '#4CAF50',
        warning: '#FFC107',
      }
    },
  },
});
