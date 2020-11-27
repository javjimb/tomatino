<template>
  <div class="settings-container">

    <settings-label label="Pomodoro length"></settings-label>
    <v-slider
        v-model="pomodoroLength"
        step="5"
        tick-size="2"
        max="50"
        min="5"
        track-color="secondary"
        track-fill-color="primary"
        color="primary"
        thumb-label
        ticks
    ></v-slider>

    <settings-label label="Short break length"></settings-label>
    <v-slider
        v-model="shortBreakLength"
        step="1"
        tick-size="2"
        max="30"
        min="1"
        track-color="secondary"
        track-fill-color="primary"
        color="primary"
        thumb-label
        ticks
    ></v-slider>

    <settings-label label="Long break length"></settings-label>
    <v-slider
        v-model="longBreakLength"
        step="5"
        tick-size="2"
        max="45"
        min="5"
        track-color="secondary"
        track-fill-color="primary"
        color="primary"
        thumb-label
        ticks
    ></v-slider>

    <settings-label label="Amount of consecutive short breaks"></settings-label>
    <v-slider
        v-model="shortBreakAmount"
        step="1"
        tick-size="1"
        max="10"
        min="1"
        track-color="secondary"
        track-fill-color="primary"
        color="primary"
        thumb-label
        ticks
    ></v-slider>

    <div class="switch-container">
      <div class="switch-container-label">
        <settings-label label="Automatically start breaks"></settings-label>
      </div>
      <div class="switch-container-switch">
        <v-switch
            v-model="startBreakAutomatically"
            inset
            flat
        ></v-switch>
      </div>
    </div>

    <div class="switch-container">
      <div class="switch-container-label">
        <settings-label label="Enable sound effects"></settings-label>
      </div>
      <div class="switch-container-switch">
        <v-switch
            v-model="startBreakAutomatically"
            inset
            flat
        ></v-switch>
      </div>
    </div>


  </div>
</template>

<script>
import SettingsLabel from "@/components/SettingsLabel";

export default {
  name: 'Settings',
  components: {
    SettingsLabel
  },

  data: () => ({
  }),

  computed: {
    pomodoroLength: {
      get() {
        return this.$store.state.settings.pomodoroLength / 60
      },
      set(minutes) {
        this.$store.dispatch('settings/setPomodoroLength', minutes * 60)
      }
    },
    shortBreakLength: {
      get() {
        return this.$store.state.settings.shortBreakLength / 60
      },
      set(minutes) {
        this.$store.dispatch('settings/setShortBreakLength', minutes * 60)
      }
    },
    longBreakLength: {
      get() {
        return this.$store.state.settings.longBreakLength / 60
      },
      set(minutes) {
        this.$store.dispatch('settings/setLongBreakLength', minutes * 60)
      }
    },
    shortBreakAmount: {
      get() {
        return this.$store.state.settings.shortBreakAmount
      },
      set(amount) {
        this.$store.dispatch('settings/setShortBreakAmount', amount)
      }
    },
    startBreakAutomatically: {
      get() {
        return this.$store.state.settings.startBreakAutomatically
      },
      set(value) {
        this.$store.dispatch('settings/setStartBreakAutomatically', value)
      }
    }
  }
}
</script>

<style>
.settings-container {
  margin-top: 40px;
}
.switch-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.switch-container-label {
  padding-top: 16px;
}
</style>
