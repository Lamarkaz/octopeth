<template>
  <div>
    <v-toolbar
      fixed
      flat
      tabs
      extended
      :clipped-left="clipped"
      height="40"
      class="background"
      style="-webkit-app-region: drag; background-color: #DCE1E3 !important; border-bottom: 1px solid rgba(0,0,0,0.1)">
      <v-spacer></v-spacer>
      <div class="extendedBar" slot="extension">
        <!-- <v-tabs
          v-model="model"
          centered
          color="grey darken-4"
          slider-color="deep-purple"
        >
          <v-tab
            v-for="i in $store.state.dapps.categories"
            :key="i"
            :href="`#tab-${i}`"
            @click="changeCat(i)"
          >
            {{ i }}
          </v-tab>
        </v-tabs> -->
        <div class="extRight">
          <v-tooltip bottom color="black">
            <v-btn class="navBtn" flat icon slot="activator" color="purple">
              <v-icon class="navIcon">all_inclusive</v-icon>
            </v-btn>
           <!-- <span>{{ this.$store.state.auth.user.balance }} ETH | {{ usdBalance }} USD</span> -->
           <span>Octopeth Wallet</span>
          </v-tooltip>
          <v-tooltip bottom color="black">
            <v-btn class="navBtn" flat icon slot="activator" color="black">
              <v-icon class="navIcon">person</v-icon>
            </v-btn>
           <!-- <span>{{ this.$store.state.auth.user.balance }} ETH | {{ usdBalance }} USD</span> -->
           <span>Profile</span>
          </v-tooltip>
          <v-tooltip bottom color="black">
          <v-btn class="navBtn" slot="activator" flat icon color="black">
            <v-icon class="navIcon">menu</v-icon>
          </v-btn>
          <span>Customize Octopeth</span>
          </v-tooltip>
          <v-menu
            origin="center center"
            transition="scale-transition"
            bottom
            dark
            color="primary"
          >
            <v-icon>menu</v-icon>
            <v-list style="cursor: pointer">
              <v-gravatar :hash="md5hash" :size="15" class="grav" slot="activator" style="margin-right: 30px"/>
              <v-list-tile key="1" @click="PublishDialog = true">
                <v-list-tile-title class="menuItemStyle"><v-icon style="font-size: 18px; margin-right: 8px">publish</v-icon>Publish ÐApp</v-list-tile-title>
              </v-list-tile>
              <v-list-tile key="2" @click="addressToClipboard()">
                <v-list-tile-title class="menuItemStyle"><v-icon style="font-size: 18px; margin-right: 8px">filter_none</v-icon>Copy Address To Clipboard</v-list-tile-title>
              </v-list-tile>
              <v-list-tile key="3" @click="exportIdentity()">
                <v-list-tile-title class="menuItemStyle"><v-icon style="font-size: 18px; margin-right: 8px">get_app</v-icon>Export Encrypted Identity</v-list-tile-title>
              </v-list-tile>
              <v-list-tile key="4" @click="LogoutDialog = true">
                <v-list-tile-title class="menuItemStyle"><v-icon style="font-size: 18px; margin-right: 8px">exit_to_app</v-icon>Logout</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </div>
      </div>
    </v-toolbar>
    
    <!-- Logout warning modal -->
    <Logout v-model="LogoutDialog"></Logout>

    <!-- Publish ÐApp modal-->
    <PublishDApp v-model="PublishDialog"></PublishDApp>
  </div>
</template>

<script>
import crypto from 'crypto'
import FileSaver from 'file-saver'
import swal from 'sweetalert'
import price from 'crypto-price'
import {BigNumber} from 'bignumber.js'

import Logout from '@/components/PopupModals/Logout.vue'
import PublishDApp from '@/components/PopupModals/PublishDApp.vue'

export default {
  data () {
    return {
      clipped: true,
      LogoutDialog: false,
      PublishDialog: false,
      usdBalance: 0
    }
  },
  methods: {
    addressToClipboard: function () {
      this.$electron.remote.clipboard.writeText('0x' + this.$store.state.auth.user.address)
      swal('Good Job!', 'Address copied to clipboard', 'success', {buttons: false})
    },
    exportIdentity: function () {
      var identity = this.$store.state.auth.user
      delete identity.interval
      delete identity.balance
      var blob = new Blob([JSON.stringify(identity)], {type: 'text/plain;charset=utf-8'})
      FileSaver.saveAs(blob, 'identity.json')
      // FileSaver doesn't support abortion detection (https://github.com/eligrey/FileSaver.js/issues/126)
      // File API will be considered in the upcoming releases
    }
  },
  computed: {
    md5hash: function () {
      return crypto.createHash('md5').update(this.$store.state.auth.user.address).digest('hex')
    }
  },
  created () {
    price.getCryptoPrice('USD', 'ETH').then(obj => {
      var bal = new BigNumber(this.$store.state.auth.user.balance)
      bal = bal.times(obj.price).decimalPlaces(2)
      this.usdBalance = bal.toNumber()
    }).catch(err => {
      console.log(err)
    })
  },
  components: {
    'Logout': Logout,
    'PublishDApp': PublishDApp
  }
}
</script>

<style scoped>
.logoText {
  font-family: 'Dosis', sans-serif !important;
  font-weight: 700;
  font-size: 23px;
  color: #222;
  position: absolute;
  margin-top: 11px;
  margin-left: -5px;
}
.grav {
  margin-top: 5px;
  border-radius: 99px;
  border: 3px solid #8223d3;
  cursor: pointer;
  transition: border-radius 0.4s ease-in-out;
}
.bottom-nav {
  z-index: 0;
}
.exploreNoti {
  font: 0/0 a;
  width: 12px;
  height: 12px;
  background: #FFDD40;
  top: -4px;
  left: 17px;
  position: absolute;
  border-radius: 100%;
  box-shadow: 0 0 0 0 rgba(255,221,65,0.4);
  -webkit-animation: feature-pulse 2s infinite;
  animation: feature-pulse 2s infinite;
  opacity: 1;
  transition: all 0.3s ease;
}
.navActive {
  background: hsla(0,0%,100%,.12);
}
.extendedBar {
  height: 100%;
  width: 100%;
  background: #F3F3F3;
}
.extRight {
  float: right;
  margin-right: -5px;
}
.navBtn {
  margin-left: -10px;
}
.navIcon {
  font-size: 20px;
}
</style>