<template>
  <div>
    <img :src="tomate" />
  </div>
</template>

<script>
import Tomate from '@/assets/images/tomate.png'

export default {
  name: 'Tomato',
  props: {
    timerMode: {
      type: String,
      required: true
    }
  },
  data: () => ({
    tomate: Tomate
  })
}
</script>
