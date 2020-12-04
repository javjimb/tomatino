<template>
  <div>
    <img height="240" class="tomato-image" :src="tomatoImage" alt="Tomato" />
  </div>
</template>

<script>
import TomatoNeutral from '@/assets/images/tomate.png'
import TomatoUp from '@/assets/images/tomate-up.png'
import TomatoStressed from '@/assets/images/tomate-stressed.png'
import TomatoHappy from '@/assets/images/tomate-happy.png'
import TomatoGoodMorning from '@/assets/images/tomate-good-morning.png'
import TomatoExhausted from '@/assets/images/tomate-exhausted.png'
import TomatoSleepy from '@/assets/images/tomate-sleepy.png'
import TomatoQuestion from '@/assets/images/tomate-question.png'

export default {
  name: 'Tomato',
  props: {
    isPomodoro: {
      type: Boolean,
      required: true
    },
    progress: {
      type: Number,
      required: true
    }
  },
  computed: {
    tomatoImage() {

      if (this.progress === 100) {

        const today = new Date()
        // early morning
        if (today.getHours() >= 6 && today.getHours() < 10) {
          return TomatoGoodMorning
        }
        // late evening
        if (today.getHours() >= 21 && today.getHours() < 3) {
          return TomatoExhausted
        }

        if (this.$store.state.session.totalPomodoros > 10) {
          return TomatoSleepy
        }

        if (this.$store.state.session.isSessionInterrupted) {
          return TomatoQuestion
        }

        return TomatoNeutral
      }

      if (this.isPomodoro) {
        if (this.progress > 80 && this.progress < 100) {
          return TomatoStressed
        } else {
          return TomatoUp
        }
      } else {
        return TomatoHappy
      }
    }
  }
}
</script>

<style scoped>

</style>
