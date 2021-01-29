const state = {
  main: 0,
  viewSwitch: "",
  isCuted: false
}

const mutations = {
  DECREMENT_MAIN_COUNTER (state) {
    state.main--
  },
  INCREMENT_MAIN_COUNTER (state) {
    state.main++
  },
  SubNavViewSwitchFn(state,payload) {
    state.viewSwitch = payload
  },
  IsCutHandle(state,payload) {
    console.log(payload)
    state.isCuted = payload
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  }
}

export default {
  state,
  mutations,
  actions
}
