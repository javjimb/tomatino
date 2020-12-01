
const state = {
  pomodoroLength: 25 * 60,
  shortBreakLength: 5 * 60,
  longBreakLength: 15 * 60,
  startBreakAutomatically: true,
  shortBreakAmount: 4,
  enableSoundEffects: true
}

const getters = {}

const actions = {
  setPomodoroLength( context, value) {
    context.commit('SET_POMODORO_LENGTH', value)
  },
  setShortBreakLength(context, value) {
    context.commit('SET_SHORT_BREAK_LENGTH', value)
  },
  setLongBreakLength(context, value) {
    context.commit('SET_LONG_BREAK_LENGTH', value)
  },
  setShortBreakAmount(context, value) {
    context.commit('SET_SHORT_BREAK_AMOUNT', value)
  },
  setEnableSoundEffects(context, value) {
    context.commit('SET_ENABLE_SOUND_EFFECTS', value)
  },
  setStartBreakAutomatically(context, value) {
    context.commit('SET_START_BREAK_AUTOMATICALLY', value)
  }
}

const mutations = {
  SET_POMODORO_LENGTH(state, payload) {
    state.pomodoroLength = payload
  },
  SET_SHORT_BREAK_LENGTH(state, payload) {
    state.shortBreakLength = payload
  },
  SET_LONG_BREAK_LENGTH(state, payload) {
    state.longBreakLength = payload
  },
  SET_SHORT_BREAK_AMOUNT(state, payload) {
    state.shortBreakAmount = payload
  },
  SET_ENABLE_SOUND_EFFECTS(state, payload) {
    state.enableSoundEffects = payload
  },
  SET_START_BREAK_AUTOMATICALLY(state, payload) {
    state.startBreakAutomatically = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
