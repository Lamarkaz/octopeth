import db from '../../js/db'

const state = {
  myDapps: [],
  explore: []
}

const mutations = {
  newMyDapps (state, docs) {
    state.myDapps = docs
  },
  newExplore (state, docs) {
    state.explore = docs
  }
}

const actions = {
  updateMyDapps (context) {
    db.find({type: 'app', installed: true}, function (err, docs) {
      if (err) throw err
      context.commit('newMyDapps', docs)
    })
  },
  updateExplore (context) {
    db.find({type: 'app', installed: { $ne: true }}, function (err, docs) {
      if (err) throw err
      context.commit('newExplore', docs)
    })
  }
}

export default {
  state,
  mutations,
  actions
}
