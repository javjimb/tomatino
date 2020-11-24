<template>
  <div id="app">

    <tomato timer-mode="huhu" ></tomato>

    <div class="clock">{{minutes}}:{{seconds}}</div>

    <div class="controls">
      <div v-if="!isTimerRunning" @click="startTimer">Play</div>
      <div v-if="isTimerRunning" @click="stopTimer">Stop</div>
    </div>

    <br />
    Pomodoro | Short Break | Long Break
    <br />
    <br />

    Pomodoros completed: 0
  </div>
</template>

<script>
import Tomato from "@/components/Tomato";

export default {
  name: 'App',
  components: {
    Tomato
  },
  data: () => ({
    sessionLength: 25 * 60,
    elapsedSeconds: 0,
    remainingSeconds: 0,
    isTimerRunning: false,
    timer: null
  }),
  methods: {
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
    stopTimer() {
      clearInterval(this.timer)
      this.timer = null
      this.remainingSeconds = 0
      this.isTimerRunning = false
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
        this.stopTimer()
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
    }
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
