<template>
  <div class="text-center">

    <tomato :is-pomodoro="isPomodoro" :progress="progress" ></tomato>

    <div v-if="isTimerRunning" class="clock">{{minutes}}:{{seconds}}</div>
    <div v-if="!isTimerRunning" class="clock">
      {{ sessionLength / 60 }}:00
    </div>

    <div class="controls">
      <v-btn
          large
          outlined
          fab
          v-if="!isTimerRunning"
          @click="startTimer"
      >
        <v-icon>mdi-play</v-icon>
      </v-btn>
      <v-btn
          large
          outlined
          fab
          v-if="isTimerRunning"
          @click="resetTimer"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>

    <br />
    <div v-if="!isTimerRunning">
      <a @click="selectSessionType('pomodoro')">Pomodoro</a>
      |
      <a @click="selectSessionType('short-break')">Short Break</a>
      |
      <a @click="selectSessionType('long-break')">Long Break</a>
    </div>
    <br />
    <br />

    Pomodoros completed: {{totalPomodoros}}
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

<style>
.clock {
  font-size: 6rem;
}
.controls {
  font-size: 2rem;
}
</style>
