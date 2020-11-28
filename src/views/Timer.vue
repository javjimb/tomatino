<template>
  <div class="timer-container text-center">

    <tomato  :is-pomodoro="isPomodoro" :progress="progress" ></tomato>

    <div v-if="isTimerRunning" class="clock">{{minutes}}:{{seconds}}</div>
    <div v-if="!isTimerRunning" class="clock">
      {{ sessionLength / 60 }}:00
    </div>

    <div class="controls">
      <v-btn
          large
          dark
          depressed
          fab
          v-if="!isTimerRunning"
          @click="startTimer"
          class="error--text"
      >
        <v-icon>mdi-play</v-icon>
      </v-btn>
      <v-btn
          large
          dark
          depressed
          fab
          v-if="isTimerRunning"
          @click="resetTimer"
          class="error--text"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>

    <br />

    <div v-show="!isTimerRunning">
      <v-btn
          depressed
          dark
          color="error--text"
          @click="selectSessionType('pomodoro')"
          class="mr-3"
      >
        Pomodoro
      </v-btn>
      <v-btn
          depressed
          dark
          color="error--text"
          @click="selectSessionType('short-break')"
          class="mr-3"
      >
        Short break
      </v-btn>
      <v-btn
          depressed
          dark
          color="error--text"
          @click="selectSessionType('long-break')"
      >
        Long break
      </v-btn>
    </div>
    <br />

    <p class="completed-container">
      Pomodoros completed: {{totalPomodoros}}
    </p>
  </div>
</template>

<script>
import Tomato from "@/components/Tomato"
import NotificationIcon from '@/assets/icons/notification.png'
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    Tomato
  },
  data: () => ({
    sessionLength: 0,
    remainingSeconds: 0,
    isTimerRunning: false,
    isPomodoro: false,
    isShortBreak: false,
    timer: null,
    totalPomodoros: 0,
    totalShortBreaks: 0
  }),
  created() {
    this.sessionLength = this.settings.pomodoroLength
    this.isPomodoro = true
  },
  methods: {
    selectSessionType(type) {
      switch (type) {
        case 'pomodoro':
          this.sessionLength = this.settings.pomodoroLength
          this.isPomodoro = true
          this.isShortBreak = false
          break
        case 'short-break':
          this.sessionLength = this.settings.shortBreakLength
          this.isPomodoro = false
          this.isShortBreak = true
          break
        case 'long-break':
          this.sessionLength = this.settings.longBreakLength
          this.isPomodoro = false
          this.isShortBreak = false
          break
      }
    },
    startTimer() {
      this.remainingSeconds = this.sessionLength
      this.timer = setInterval(() => this.timerTick(), 1000)
      this.isTimerRunning = true

      let msg = this.isPomodoro ? 'New pomodoro has started' : 'Take a break!'
      new Notification('Tomatino', { body: msg, icon: NotificationIcon})
    },
    resetTimer() {
      clearInterval(this.timer)
      this.timer = null
      this.remainingSeconds = 0
      this.isTimerRunning = false
    },
    finishSession() {
      this.resetTimer()

      let msg = this.isPomodoro ? 'Pomodoro has ended' : 'Break has ended'
      new Notification('Tomatino', { body: msg, icon: NotificationIcon})

      if (this.isPomodoro) {
        this.totalPomodoros++
      } else if (this.isShortBreak) {
        this.totalShortBreaks++
      }

      if (this.isPomodoro && this.settings.startBreakAutomatically) {
        if (this.totalShortBreaks === this.settings.shortBreakAmount) {
          this.selectSessionType('long-break')
          this.totalShortBreaks = 0
        } else {
          this.selectSessionType('short-break')
        }
        this.startTimer()
      } else {
        this.selectSessionType('pomodoro')
      }
    },
    padTime: function(time) {
      return (time < 10 ? '0' : '') + time
    },
    timerTick: function() {
      this.remainingSeconds--
      if (this.remainingSeconds === 0) {
        this.finishSession()
      }
    }
  },
  computed: {
    minutes: function() {
      const minutes = Math.floor((this.remainingSeconds % 3600) / 60)
      return this.padTime(minutes)
    },
    seconds: function() {
      const seconds = Math.floor((this.remainingSeconds % 3600) % 60);
      return this.padTime(seconds);
    },
    elapsedSeconds: function() {
      return this.sessionLength - this.remainingSeconds
    },
    progress: function() {
      return (this.elapsedSeconds * 100) / this.sessionLength
    },
    ...mapState({ settings: state => state.settings })
  }
}
</script>

<style scoped>
@font-face {
  font-family: "digital-7";
  src: local("digital-7"),
  url("../assets/fonts/digital-7.ttf")
  format("truetype");
}
.timer-container {
  margin-top: 40px;
}
.clock {
  font-family: "digital-7", "Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size: 8rem;
}
.controls {
  font-size: 2rem;
}
.completed-container {
  color: #272727;
  font-weight: bolder;
}
</style>
