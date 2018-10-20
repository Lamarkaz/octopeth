// The auth state communicate with db to set user auth, deauth and balance
import db from '../../js/db'
import config from '../../../../config'
import Web3 from 'web3'

var web3 = new Web3(config.provider)

const state = {
  authed: false,
  user: {}
}

const mutations = {
  AUTH (state, user) {
    state.authed = true
    state.user = user
  },
  DEAUTH (state) {
    state.authed = false
    state.user = {}
  },
  UPDATEBALANCE (state, balance) {
    if (typeof (state.user.balance) !== 'undefined') {
      state.user.balance = balance
    }
  }
}

const actions = {
  authenticate (context, wallet) {
    db.update({type: 'wallet'}, {type: 'wallet', data: wallet}, {upsert: true}, function (err) {
      if (!err) {
        web3.eth.getBalance('0x' + wallet.address).then(function (balance) {
          wallet.balance = web3.utils.fromWei(balance, 'ether')
          context.commit('AUTH', wallet)
          wallet.interval = setInterval(function () {
            web3.eth.getBalance('0x' + wallet.address).then(function (balance) {
              if (balance !== state.user.balance) {
                context.commit('UPDATEBALANCE', web3.utils.fromWei(balance, 'ether'))
              }
            })
          }, 5000)
        })
      }
    })
  },
  deauthenticate (context) {
    var interval = state.user.interval
    db.remove({type: 'wallet'}, function (err) {
      if (!err) {
        context.commit('DEAUTH')
        clearInterval(interval)
      }
    })
  }
}

export default {
  state,
  mutations,
  actions
}
