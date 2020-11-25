<template>
  <div>
    <img :src="tomatoImage" alt="Tomato" />
  </div>
</template>

<script>
import TomatoNeutral from '@/assets/images/tomate.png'
import TomatoUp from '@/assets/images/tomate-up.png'
import TomatoStressed from '@/assets/images/tomate-stressed.png'
import TomatoHappy from '@/assets/images/tomate-happy.png'

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
