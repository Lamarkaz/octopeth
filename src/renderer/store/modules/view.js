// The view state for Store component views (Explore, MyDApps, Published DApps)
const state = {
  currView: 'explore'
}

const mutations = {
  CHANGECAT (state, name) {
    state.cat = name
  },
  CHANGEVIEW (state, view) {
    state.currView = view
  }
}

export default {
  state,
  mutations
}
