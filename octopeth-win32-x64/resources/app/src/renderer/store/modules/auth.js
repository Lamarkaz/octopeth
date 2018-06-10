const state = {
  authed: false
}

const mutations = {
  AUTH (state) {
    state.authed = true
  },
  DEAUTH (state) {
    state.authed = false
  }
}

export default {
  state,
  mutations
}
