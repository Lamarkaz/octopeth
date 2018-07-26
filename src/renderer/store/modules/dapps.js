import db from '../../js/db'

const state = {
  myDapps: [],
  explore: []
}

const mutations = {
  NEWMYDAPPS (state, docs) {
    state.myDapps = docs
  },
  NEWEXPLORE (state, docs) {
    state.explore = docs
  }
}

const actions = {
  updateMyDapps (context) {
    db.find({type: 'app', 'data.installed': true}, function (err, docs) {
      if (err) throw err
      context.commit('NEWMYDAPPS', docs)
    })
  },
  updateExplore (context) {
    db.find({type: 'app', 'data.installed': { $ne: true }}, function (err, docs) {
      if (err) throw err
      context.commit('NEWEXPLORE', docs)
    })
  }
}

export default {
  state,
  mutations,
  actions
}
