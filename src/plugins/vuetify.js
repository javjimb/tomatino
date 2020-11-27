import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#574240',
        secondary: '#9A6B72',
        accent: '#BFA5A3',
        error: '#FF5252',
        info: '#00C1FF',
        success: '#4CAF50',
        warning: '#FFC107',
      },
      dark: {
        primary: '#424242'
      }
    },
  },
});
