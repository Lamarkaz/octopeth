<template>
  <div class="">
    <div id="electron-titlebar"></div>
    <v-toolbar
      fixed
      dark
      flat
      tabs
      height="70"
      class="background">
      <v-toolbar-title v-on:click="$router.push('/')">
        <img src="../assets/logo.svg" width="40px" style="margin-left: 40px; cursor: pointer; margin-top: 10px; margin-right: 7.5px"/>
        <span class="logoText">OCTOPETH</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
        <v-chip color="purple darken-3" text-color="white" style="margin-right: 15px; padding: 0px 10px; font-weight: 600; font-family: 'Dosis'; font-size: 15px; color: #222 !important" disabled="">
          Balance: 154 ETH
        </v-chip>
          <div class="text-xs-center">
            <v-menu
              origin="center center"
              transition="scale-transition"
              bottom
              dark
              color="primary"
            >
              <v-gravatar hash="5d41402abc4b2a76b9719d911017c592" :size="26" class="grav" slot="activator" style="margin-right: 30px"/>
              <v-list>
                <v-list-tile key="1" @click="">
                  <v-list-tile-title class="menuItemStyle">Publish ÐApp</v-list-tile-title>
                </v-list-tile>
                <v-list-tile key="2" @click="">
                  <v-list-tile-title class="menuItemStyle">Copy this Address</v-list-tile-title>
                </v-list-tile>
                <v-list-tile key="2" @click="">
                  <v-list-tile-title class="menuItemStyle">Export Identity File</v-list-tile-title>
                </v-list-tile>
                <v-list-tile key="3" @click="">
                  <v-list-tile-title class="menuItemStyle">Logout</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </div>
          <v-tabs
            slot="extension"
            v-model="currentItem"
            fixed-tabs
            color="transparent"
            slider-color="purple darken-2"
            show-arrows
          >
            <v-tab
              v-for="item in items"
              :key="item"
              :href="'#tab-' + item"
            >
              {{ item }}
            </v-tab>
          </v-tabs>
    </v-toolbar>

    <!-- Top store navigation
      <v-card style="margin-top: 174px">
        <v-bottom-nav
          :value="true"
          :active.sync="e2"
          :color="color"
          absolute
          shift
        >
          <v-btn dark>
            <span>My ÐApps</span>
            <v-icon>archive</v-icon>
          </v-btn>
          <v-btn dark>
            <span>Explore</span>
            <v-icon>explore</v-icon>
          </v-btn>
        </v-bottom-nav>
      </v-card> -->

    <!-- installed view -->
    <MyDapps></MyDapps>
    <!-- explore view-->
    <Explore></Explore>
    <!-- <Explore></Explore> -->

    <CircularNav></CircularNav>
  </div>
</template>


<script>
import scrape from 'website-scraper'
import phantomHtml from 'website-scraper-phantom'
import path from 'path'
import { remote } from 'electron'
import download from 'image-downloader'

export default {
  data () {
    return {
      explore: [],
      currentItem: 'tab-Home',
      items: [
        'Home', 'Shopping', 'Videos', 'App1', 'App2', 'Images', 'App3', 'App4', 'App'
      ],
      e2: 3
    }
  },
  created () {
    // var self = this
    // this.$db.find({type: 'app', installed: true}, function (err, docs) {
    //   if (err) throw err
    //   self.myDapps = docs
    // })
    // this.$db.find({type: 'app', installed: { $ne: true }}, function (err, docs) {
    //   if (err) throw err
    //   self.explore = docs
    // })
  },
  methods: {
    install: function (url, title, logo, cb) {
      var self = this
      this.$db.count({type: 'app', installed: true}, function (err, count) {
        if (err) self.$electron.remote.dialog.showErrorBox('Error', 'There seems to be a problem connecting to the local database')
        scrape({urls: [url], directory: path.join(remote.app.getPath('userData'), '/apps/' + count + 1 + '/'), httpResponseHandler: phantomHtml}).then(function () {
          download.image({url: url, dest: path.join(remote.app.getPath('userData'), '/logos/' + count + 1 + '/')}).then(({filename, image}) => {
            self.$db.insert({
              type: 'app',
              location: path.join(remote.app.getPath('userData'), '/apps/' + count + 1 + '/'),
              title: title,
              logo: path.join(remote.app.getPath('userData'), '/logos/' + count + 1 + '/' + filename),
              installed: true,
              id: count + 1
            }, function (err) {
              if (err) throw err
              if (cb) cb()
            })
          }).catch(function () {
            self.$electron.remote.dialog.showErrorBox('Error', 'The dApp logo could not be downloaded')
          })
        }).catch(function () {
          self.$electron.remote.dialog.showErrorBox('Error', 'The dApp contents could not be downloaded')
        })
      })
    }
  },
  computed: {
    // dapp_processed () {
    //   var arr = []
    //   for (var i = 0; i < this.myDapps.length; i++) {
    //     if (this.myDapps[i].category === 'gaming') {
    //       var obj = this.myDapps[i]
    //       obj.icon = 'videogame_asset'
    //       arr.push(obj)
    //     }
    //   }
    //   return arr
    // },
    // color () {
    //   switch (this.e2) {
    //     case 0: return 'grey darken-4'
    //     case 1: return 'purple darken-3'
    //   }
    // }
  }
}
</script>

<style scoped>
  .logoText {
    font-family: 'Dosis', sans-serif !important;
    font-weight: 700;
    font-size: 23px;
    color: #8223d3 !important;
    position: absolute;
    margin-top: 9px;
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
</style>
