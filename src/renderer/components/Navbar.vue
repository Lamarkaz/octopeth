<template>
  <div>
    <v-toolbar
      fixed
      dark
      flat
      tabs
      height="70"
      class="background"
      color="purple darken-3">
      <v-toolbar-title v-on:click="$router.push('/dapp')">
        <img src="../assets/logo-dark.svg" width="45px" style="margin-left: 50px; cursor: pointer; margin-top: 10px; margin-right: 7.5px"/>
        <span class="logoText">OCTOPETH</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-chip color="grey darken-4" text-color="white" style="margin-right: 15px; padding: 0px 10px; font-weight: 600; font-family: 'Dosis'; font-size: 15px" disabled="">
        Balance: {{$store.state.auth.user.balance}} ETH
      </v-chip>
      <div class="text-xs-center">
        <v-menu
          origin="center center"
          transition="scale-transition"
          bottom
          dark
          color="primary"
        >
          <v-gravatar :hash="md5hash" :size="26" class="grav" slot="activator" style="margin-right: 30px"/>
          <v-list>
            <v-list-tile key="1" @click='toggle()'>
              <v-list-tile-title class="menuItemStyle">Publish ÐApp</v-list-tile-title>
            </v-list-tile>
            <v-list-tile key="2" @click="addressToClipboard()">
              <v-list-tile-title class="menuItemStyle">Copy Address To Clipboard</v-list-tile-title>
            </v-list-tile>
            <v-list-tile key="3" @click="exportIdentity()">
              <v-list-tile-title class="menuItemStyle">Export Encrypted Identity</v-list-tile-title>
            </v-list-tile>
            <v-list-tile key="4" @click.stop="dialog = true">
              <v-list-tile-title class="menuItemStyle">Logout</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </div>
      <v-tabs
        slot="extension"
        v-model="currentItem"
        fixed-tabs
        color="grey darken-4"
        slider-color="grey darken-1"
        show-arrows
      >
        <v-tab
          v-for="item in items"
          :key="`5${item}`"
          @click="changeCat(item)"
          :href="'#tab-' + item"
        >
          {{ item }}
        </v-tab>
      </v-tabs>
    </v-toolbar>
      <v-dialog
        v-model="dialog"
        max-width="390" 
      >
        <v-card class="logoutAlert">
          <v-card-title class="headline" style="font-size: 28px; font-family: 'Dosis'">Are you sure you want to logout?</v-card-title>
          <v-card-text style="color: rgba(255,255,255,0.8)">
            Make sure to export your identity file before logging out to be able to login again.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="red darken-1"
              flat="flat"
              @click="$store.dispatch('deauthenticate')"
              class="genBtn"
            >
              Logout
            </v-btn>

            <v-btn
              color="green darken-1"
              flat="flat"
              class="genBtn"
              @click="exportIdentity()"
            >
              Export Identity File
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
</template>

<script>
import crypto from 'crypto'
import FileSaver from 'file-saver'
export default {
  data () {
    return {
      dialog: false,
      explore: [],
      currentItem: 'tab-Home',
      items: [
        'HOME', 'GAMING', 'ENTERTAINMENT', 'FINANCE', 'SOCIAL', 'EXCHANGE', 'GAMBLING', 'TOKENS', 'SHARING', 'GOVERNANCE', 'OTHER'
      ],
      e2: 3,
      isOpen: false
    }
  },
  methods: {
    toggle: function () {
      this.isOpen = !this.isOpen
    },
    addressToClipboard: function () {
      this.$electron.remote.clipboard.writeText('0x' + this.$store.state.auth.user.address)
      alert('Address copied to clipboard')
    },
    exportIdentity: function () {
      var identity = this.$store.state.auth.user
      delete identity.interval
      delete identity.balance
      var blob = new Blob([JSON.stringify(identity)], {type: 'text/plain;charset=utf-8'})
      FileSaver.saveAs(blob, 'identity.json')
    },
    changeCat: function (name) {
      this.$store.commit('CHANGECAT', name)
    }
  },
  computed: {
    md5hash: function () {
      return crypto.createHash('md5').update(this.$store.state.auth.user.address).digest('hex')
    }
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
  }
  .bottom-nav {
    z-index: 0;
  }
  .logoutAlert {
    border-top: solid 4px rgb(107, 32, 172);
    background: #222;
    color: white;
    padding-top: 10px;
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 10px;
  }
  .genBtn {
    font-family: 'Dosis', sans-serif;
    font-weight: 700;
    font-size: 16px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 900px;
  }
</style>