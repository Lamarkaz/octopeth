<template>
  <div>
    <v-navigation-drawer
      dark
      absolute
      permanent
      width="200"
      :clipped="clipped"
      v-model="drawer"
    >
      <v-list style="margin-top: 62px">
        <v-list-tile @click="currentView = 'inventory'" :value="currentView == 'inventory'" active-class="grey darken-2">
          <v-list-tile-action>
            <v-icon>archive</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>My ÐApps</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="currentView = 'explore'" :value="currentView == 'explore'" active-class="grey darken-2">
          <v-list-tile-action>
            <v-icon>explore</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Explore</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    
    <v-toolbar
      fixed
      dark
      flat
      :clipped-left="clipped"
      height="70"
      class="background"
      color="purple darken-3"
      style="-webkit-app-region: drag">
      <v-toolbar-title v-on:click="$router.push('/dapp')">
        <img src="../assets/logo-dark.svg" width="45px" style="margin-left: 50px; cursor: pointer; margin-top: 10px; margin-right: 7.5px"/>
        <span class="logoText">OCTOPETH</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom color="black">
        <v-chip slot="activator" color="grey darken-4" text-color="white" style="margin-right: 15px; padding: 0px 10px; font-weight: 600; font-family: 'Dosis'; font-size: 15px" disabled="">
          Balance: {{ usdBalance }} ETH
        </v-chip>
        <span>{{ usdBalance }} USD</span>
      </v-tooltip>
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
            <v-list-tile key="1" @click.stop="pubDialog = true">
              <v-list-tile-title class="menuItemStyle"><v-icon style="font-size: 18px; margin-right: 8px">publish</v-icon>Publish ÐApp</v-list-tile-title>
            </v-list-tile>
            <v-list-tile key="2" @click="addressToClipboard()">
              <v-list-tile-title class="menuItemStyle"><v-icon style="font-size: 18px; margin-right: 8px">filter_none</v-icon>Copy Address To Clipboard</v-list-tile-title>
            </v-list-tile>
            <v-list-tile key="3" @click="exportIdentity()">
              <v-list-tile-title class="menuItemStyle"><v-icon style="font-size: 18px; margin-right: 8px">get_app</v-icon>Export Encrypted Identity</v-list-tile-title>
            </v-list-tile>
            <v-list-tile key="4" @click.stop="dialog = true">
              <v-list-tile-title class="menuItemStyle"><v-icon style="font-size: 18px; margin-right: 8px">exit_to_app</v-icon>Logout</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </div>
    </v-toolbar>
    
    <!-- Logout warning modal -->
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

    <!-- Publish ÐApp modal-->
    <v-dialog
      v-model="pubDialog"
      max-width="700" 
    >
      <v-card class="logoutAlert">
        <v-card-title class="headline" style="font-size: 28px; font-family: 'Dosis'">Publish a new ÐApp</v-card-title>
        <v-card-text style="width: 80%; margin-right: auto; margin-left: auto">
          <v-layout row wrap>
            <v-flex :key="8" xs8 style="margin-left: -25px">
              <v-text-field 
                name="input-10-1"
                v-model="dappTitle"
                label="ÐApp Title"
                color="white"
                dark
                required
                >
              </v-text-field>
              <v-text-field 
                name="input-10-1"
                label="Git Repository URL"
                color="white"
                dark
                required
                >
              </v-text-field>
              <v-layout align-center>
                <v-switch v-model="enabled" hide-details color="white" class="shrink mr-2" dark></v-switch>
                <label style="font-size: 14px; margin-left: 15px; opacity: 0.7">Custom Branch</label>
                <v-text-field v-model="gitBranch" :disabled="!enabled" color="white" label="Git branch" dark style="margin-left: 20px; max-width: 60%; margin-right"></v-text-field>
              </v-layout>
              <v-layout align-center>
                <v-switch v-model="pathEnabled" hide-details color="white" class="shrink mr-2" dark></v-switch>
                <label style="font-size: 14px; margin-left: 15px; opacity: 0.7">Custom Path</label>
                <v-text-field :disabled="!pathEnabled" color="white" label="Path" dark style="margin-left: 20px; max-width: 60%; margin-right"></v-text-field>
              </v-layout>
              <v-text-field 
                name="input-10-1"
                v-model="dappLogo"
                label="Logo URL"
                color="white"
                dark
                required
                >
              </v-text-field>
              <v-text-field 
                name="input-10-1"
                v-model="dappDesc"
                label="Description"
                color="white"
                counter=60
                dark
                required
                >
              </v-text-field>
              <v-select
                v-model="dappCateg"
                dark
                color="white"
                :items="$store.state.dapps.categories"
                label="Category"
              ></v-select>
            </v-flex>
            <v-flex :key="4" xs4>
                <h3 class="previewer">Your ÐApp Card Preview</h3>
                <v-card class="dappCard px-0" style="height: 240px; width: 230px">
                <v-card-media :src="dappLogo" height="130px" class="dappLogo">
                </v-card-media>
                <v-card-title primary-title >
                  <v-card-text>
                    <h3 class="appTitle text-xs-center">{{ dappTitle }}</h3>
                    <div class="categType">
                      <v-card-text class="text-xs-center categText">
                        <v-icon style="color: white; margin-right: 2px; margin-top: -5px"></v-icon> {{ dappCateg }}
                      </v-card-text>
                    </div>
                    <div class="appBody text-xs-left">{{ dappDesc }}</div>
                  </v-card-text>
                </v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat="flat"
            class="genBtn"
            @click="publish"
          >
            Publish
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- installed view -->
    <MyDapps v-if="currentView == 'inventory'"></MyDapps>
    <!-- explore view-->
    <Explore v-if="currentView == 'explore'"></Explore>
  </div>
</template>

<script>
import crypto from 'crypto'
import FileSaver from 'file-saver'
import swal from 'sweetalert'
import price from 'crypto-price'
import {BigNumber} from 'bignumber.js'

export default {
  data () {
    return {
      drawer: true,
      clipped: true,
      currentView: 'inventory',
      dappLogo: '',
      dappTitle: '',
      dappDesc: '',
      dappCateg: '',
      dialog: false,
      pubDialog: false,
      explore: [],
      currentItem: 'tab-Home',
      e2: 3,
      isOpen: false,
      enabled: false,
      pathEnabled: false,
      gitBranch: 'master',
      usdBalance: 0
    }
  },
  methods: {
    toggle: function () {
      this.isOpen = !this.isOpen
    },
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
      swal('Identity Saved!', 'Identity file is saved successfully', 'success', {buttons: false})
    },
    changeCat: function (name) {
      this.$store.commit('CHANGECAT', name)
    },
    publish: function () {
      swal('Ðapp Published', 'Ðapp is successfully published and is explorable.', 'success', {buttons: false})
    }
  },
  computed: {
    md5hash: function () {
      return crypto.createHash('md5').update(this.$store.state.auth.user.address).digest('hex')
    }
  },
  created () {
    price.getCryptoPrice('USD', 'ETH').then(obj => {
      var bal = new BigNumber(this.$store.state.user.balance)
      bal = bal.times(obj.price).decimalPlaces(2)
      this.usdBalance = bal.toNumber()
    }).catch(err => {
      console.log(err)
    })
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
  .appTitle {
    font-weight: 700;
    font-size: 22px;
    color: rgb(107, 32, 172);
    transition: color 800ms ease-in-out;
  }
  .dappLogo {
    padding: 15px;
    width: 130px;
    margin-right: auto;
    margin-left: auto;
  }
  .appBody {
    color: white;
    word-break: break-all;
    margin-left: -10px;
    margin-top: 10px;
    font-weight: 500;
    font-size: 14px;
    display: none;
    transition: all 600ms ease-in-out;
  }
  .dappCard {
    font-family: 'Dosis';
    margin: 30px;
    margin-top: 15px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 20px;
    background: rgba(0,0,0,0.4);
    border-radius: 5px;
    cursor: pointer;
    transition: margin-top 600ms ease-in-out;
  }
  .categType {
    width: 100%;
    height: 30px;
    left: 0px;
    bottom: 0px;
    background: rgba(0,0,0,.3);
    position: absolute;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    display: none;
    transition: none 600ms ease-in-out;
  }
  .categText {
    font-size: 13px;
    font-weight: 700;
    color: white;
    margin-top: -10px;
  }
  .dappCard:hover  .appTitle {
    color: rgb(107, 32, 172);
    margin-top: -175px;
  }
  .dappCard:hover  .appBody {
    display: block;
  }
  .dappCard:hover  .dappLogo {
    opacity: 0;
  }
  .dappCard:hover  .categType {
    display: block;
  }
  .previewer {
    font-family: 'Dosis';
    font-weight: 500;
    font-size: 13px;
    color: rgba(255,255,255,0.5);
    margin-top: 40px;
    margin-left: 35px;
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
</style>