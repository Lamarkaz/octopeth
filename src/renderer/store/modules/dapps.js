import db from '../../js/db'

const state = {
  myDapps: [],
  explore: [],
  categories: [
    { item: 'ALL', value: 0 },
    { item: 'GAMING', value: 1 },
    { item: 'ENTERTAINMENT', value: 2 },
    { item: 'FINANCE', value: 3 },
    { item: 'SOCIAL', value:4 },
    { item: 'EXCHANGE', value: 5 },
    { item: 'GAMBLING', value: 6 },
    { item: 'TOKENS', value: 7 },
    { item: 'SHARING', value: 8 },
    { item: 'GOVERNANCE', value:9 },
    { item: 'OTHER', value: 10 }
  ],
  cat: 'ALL'
}

const mutations = {
  NEWMYDAPPS (state, docs) {
    state.myDapps = docs
  },
  NEWEXPLORE (state, docs) {
    state.explore = docs
  },
  CHANGECAT (state, name) {
    state.cat = name
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
