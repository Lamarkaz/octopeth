// The dapps state that fetch DApps list from Database
import db from '../../js/db'

const state = {
  myDapps: [],
  explore: [],
  categories: ['ALL', 'GAMING', 'ENTERTAINMENT', 'FINANCE', 'SOCIAL', 'EXCHANGE', 'GAMBLING', 'TOKENS', 'SHARING', 'GOVERNANCE', 'OTHER'],
  cat: 'ALL'
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
