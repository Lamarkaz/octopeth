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
      var dataArr = []
      for (let i of docs) {
        dataArr.push(i.data)
      }
      context.commit('NEWMYDAPPS', dataArr)
    })
  },
  updateExplore (context) {
    db.find({type: 'app', 'data.installed': { $ne: true }}, function (err, docs) {
      if (err) throw err
      var dataArr = []
      for (let i of docs) {
        dataArr.push(i.data)
      }
      context.commit('NEWEXPLORE', dataArr)
    })
  }
}

export default {
  state,
  mutations,
  actions
}
