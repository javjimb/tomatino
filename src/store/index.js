import Vuex from 'vuex';
import Vue from 'vue';
import settings from "@/store/modules/settings";
import session from "@/store/modules/session";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    settings,
    session
  }
});
