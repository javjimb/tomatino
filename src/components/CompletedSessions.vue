<template>
    <div class="completed-container">
      <div>Pomodoros completed: </div>
      <img v-for="i in total" :key="i" width="30" alt="Pomodoro" :src="tomatoIcon" />
    </div>
</template>

<script>
import TomatoIcon from '@/assets/icons/tomato-2.png'

export default {
  name: 'CompletedSessions',
  props: {
    total: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    tomatoIcon: null
  }),
  created() {
    this.tomatoIcon = TomatoIcon
  }
}
</script>

<style scoped>
.completed-container {
  margin-top: 20px;
  color: #272727;
  font-weight: bolder;
}
img {
  margin-right: 5px;
}
</style>
