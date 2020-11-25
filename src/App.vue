<template>
  <div id="app">

    <tomato timer-mode="huhu" ></tomato>

    <div v-if="isTimerRunning" class="clock">{{minutes}}:{{seconds}}</div>
    <div v-if="!isTimerRunning" class="clock">
      {{ sessionLength / 60 }}:00
    </div>

    <div class="controls">
      <div v-if="!isTimerRunning" @click="startTimer">Play</div>
      <div v-if="isTimerRunning" @click="resetTimer">Cancel</div>
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
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    Tomato
  },
  data: () => ({
    sessionLength: 0,
    elapsedSeconds: 0,
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
    setSessionLength(length) {
      this.sessionLength = length
    },
    startTimer() {
      this.remainingSeconds = this.sessionLength
      this.timer = setInterval(() => this.timerTick(), 1000)
      this.isTimerRunning = true
      //new Notification('Pomodoro Timer', { body: 'New pomodoro has started', icon: notificationIcon});
      //new Notification('Pomodoro Timer', { body: 'New pomodoro has started'})
      /*
      var audio = new Audio('http://javierjimenez.net/media/timer_start.wav');
      audio.play();
      this.todo.started = true;
      this.todo.running = true;
      this.$emit('timer-start', this.todo.task_id);
      this.$forceUpdate();
       */
    },
    resetTimer() {
      clearInterval(this.timer)
      this.timer = null
      this.remainingSeconds = 0
      this.isTimerRunning = false
    },
    finishSession() {
      this.resetTimer()

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

      /*
      this.todo.running = false;
      this.$emit('timer-stop', this.todo.task_id)
      this.$forceUpdate();
       */
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
    ...mapState({ settings: state => state.settings })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
body {
  background-color: #E6203C;
  color: black;
}
.clock {
  font-size: 6rem;
}
.controls {
  font-size: 2rem;
}
</style>
