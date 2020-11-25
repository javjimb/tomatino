import Vue from 'vue';
import VueRouter from 'vue-router';
import Timer from '@/views/Timer.vue';
import Settings from '@/views/Settings.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'timer',
    component: Timer
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
