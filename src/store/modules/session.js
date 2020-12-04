
const state = {
  sessionLength: 0,
  remainingSeconds: 0,
  isTimerRunning: false,
  isPomodoro: false,
  isShortBreak: false,
  totalPomodoros: 0,
  totalShortBreaks: 0
}

const getters = {}

const mutations = {
  SET_SESSION_LENGTH(state, payload) {
    state.sessionLength = payload
  },
  SET_REMAINING_SECONDS(state, payload) {
    state.remainingSeconds = payload
  },
  SET_IS_TIMER_RUNNING(state, payload) {
    state.isTimerRunning = payload
  },
  SET_IS_POMODORO(state, payload) {
    state.isPomodoro = payload
  },
  SET_IS_SHORT_BREAK(state, payload) {
    state.isShortBreak = payload
  },
  SET_TOTAL_POMODOROS(state, payload) {
    state.totalPomodoros = payload
  },
  SET_TOTAL_SHORT_BREAKS(state, payload) {
    state.totalShortBreaks = payload
  }
}

const actions = {
  setSessionLength(context, value) {
    context.commit('SET_SESSION_LENGTH', value)
  },
  setRemainingSeconds(context, value) {
    context.commit('SET_REMAINING_SECONDS', value)
  },
  setIsTimerRunning(context, value) {
    context.commit('SET_IS_TIMER_RUNNING', value)
  },
  setIsPomodoro(context, value) {
    context.commit('SET_IS_POMODORO', value)
  },
  setIsShortBreak(context, value) {
    context.commit('SET_IS_SHORT_BREAK', value)
  },
  setTotalPomodoros(context, value) {
    context.commit('SET_TOTAL_POMODOROS', value)
  },
  setTotalShortBreaks(context, value) {
    context.commit('SET_TOTAL_SHORT_BREAKS', value)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
