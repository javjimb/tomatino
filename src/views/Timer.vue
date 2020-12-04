<template>
  <div class="timer-container text-center">

      <v-card
          class="mx-auto"
          max-width="344"
          color="#E6203C"
          flat
      >
        <tomato  :is-pomodoro="isPomodoro" :progress="progress" ></tomato>

        <div v-if="isTimerRunning" style="text-align: center !important;">
          <v-progress-linear height="10" :value="progress"></v-progress-linear>
          <v-card-subtitle v-if="isPomodoro">Time focus</v-card-subtitle>
          <v-card-subtitle v-if="!isPomodoro">Take a break!</v-card-subtitle>
        </div>

        <div v-if="isTimerRunning" class="clock">{{minutes}}:{{seconds}}</div>
        <div v-if="!isTimerRunning" class="clock">{{ sessionLength / 60 }}:00</div>

      </v-card>



    <div class="controls">
      <v-btn
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
          dark
          depressed
          fab
          v-if="isTimerRunning"
          @click="resetTimer(true)"
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
import startWav from '@/assets/sounds/timer_start.wav'
import stopWav from '@/assets/sounds/timer_stop.wav'
import finishWav from '@/assets/sounds/timer_finish.wav'

export default {
  name: 'App',
  components: {
    Tomato
  },
  data: () => ({
    timer: null,
    startSound: null,
    stopSound: null,
    finishSound: null
  }),
  created() {
    this.sessionLength = this.settings.pomodoroLength
    this.isPomodoro = true

    // Initialize sound
    this.startSound = new Audio(startWav)
    this.stopSound = new Audio(stopWav)
    this.finishSound = new Audio(finishWav)
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
    playSound(name) {
      if (this.settings.enableSoundEffects) {
        switch (name) {
          case 'start':
            this.startSound.play()
            break;
          case 'stop':
            this.stopSound.play()
            break;
          case 'finish':
            this.finishSound.play()
            break;
        }
      }
    },
    startTimer(playSound) {
      if (playSound) {
        this.playSound('start')
      }
      this.remainingSeconds = this.sessionLength
      this.timer = setInterval(() => this.timerTick(), 1000)
      this.isTimerRunning = true

      let msg = this.isPomodoro ? 'New pomodoro has started' : 'Take a break!'
      new Notification('Tomatino', { body: msg, icon: NotificationIcon})
    },
    resetTimer(playSound) {
      if (playSound) {
        this.playSound('stop')
      }
      clearInterval(this.timer)
      this.timer = null
      this.remainingSeconds = 0
      this.isTimerRunning = false
    },
    finishSession() {
      this.playSound('finish')
      this.resetTimer(false)

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
        this.startTimer(false)
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
    sessionLength: {
      get() {
        return this.$store.state.session.sessionLength
      },
      set(seconds) {
        this.$store.dispatch('session/setSessionLength', seconds)
      }
    },
    remainingSeconds: {
      get() {
        return this.$store.state.session.remainingSeconds
      },
      set(seconds) {
        this.$store.dispatch('session/setRemainingSeconds', seconds)
      }
    },
    isTimerRunning: {
      get() {
        return this.$store.state.session.isTimerRunning
      },
      set(value) {
        this.$store.dispatch('session/setIsTimerRunning', value)
      }
    },
    isPomodoro: {
      get() {
        return this.$store.state.session.isPomodoro
      },
      set(value) {
        this.$store.dispatch('session/setIsPomodoro', value)
      }
    },
    isShortBreak: {
      get() {
        return this.$store.state.session.isShortBreak
      },
      set(value) {
        this.$store.dispatch('session/setIsShortBreak', value)
      }
    },
    totalPomodoros: {
      get() {
        return this.$store.state.session.totalPomodoros
      },
      set(value) {
        this.$store.dispatch('session/setTotalPomodoros', value)
      }
    },
    totalShortBreaks: {
      get() {
        return this.$store.state.session.totalShortBreaks
      },
      set(value) {
        this.$store.dispatch('session/setTotalShortBreaks', value)
      }
    },
    ...mapState({
      settings: state => state.settings,
      session: state => state.session
    })
  }
}
</script>

<style scoped>
.timer-container {
  margin-top: 40px;
}
.clock {
  font-size: 5rem;
}
.controls {
  font-size: 2rem;
}
.completed-container {
  color: #272727;
  font-weight: bolder;
}
</style>
