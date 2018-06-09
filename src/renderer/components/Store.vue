<template>
  <div class="background">
    <v-toolbar
      fixed
      dark
      flat
      height="75"
      class="background">
      <v-toolbar-title v-on:click="$router.push('/')">
        <img src="../assets/logo.svg" width="70px" style="margin-left: 15px; cursor: pointer; margin-top: 10px"/>
        <span class="logoText orange--text">OCTOPETH</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
        <v-chip color="orange darken-3" text-color="white" style="margin-right: 15px; padding-left: 10px" disabled="">
          Balance: 154 ETH
        <v-icon style="font-size: 18px; margin-left: 0px">attach_money</v-icon>
        </v-chip>
      <v-tooltip bottom color="black">
        <v-gravatar hash="5d41402abc4b2a76b9719d911017c592" :size="32" class="grav" slot="activator"/>
        <span>Copy this Address</span>
      </v-tooltip>
    </v-toolbar>

    <!-- installed view -->
    <div class="mainWrapper" style="margin-top: 120px">
      <h3 class="text-xs-center MainWrapperTypo">
        <v-icon class="mainWrapperIcon">cloud_download</v-icon>
        My ÐApps
      </h3>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex
            v-for="i
            in myDapps"
            :key="`2${i.title}`"
            xs12
            md6
            lg3
            class="appView"
          >
            <v-card class="dappCard" style="height: 250px; width: 250px">
              <v-card-media :src="i.logo" height="150px" class="dappLogo">
              </v-card-media>
              <v-card-title primary-title >
                <v-card-text>
                  <h3 class="appTitle text-xs-center">{{ i.title }}</h3>
                  <div class="appBody text-xs-center">Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
                </v-card-text>
              </v-card-title>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>

    <v-spacer style="border-bottom: 2px solid white; opacity: 0.05; width: 60%; margin-left: auto; margin-right: auto; margin-top: 60px"></v-spacer>

    <!-- explore view-->
    <div class="mainWrapper">
      <h3 class="text-xs-center MainWrapperTypo">
        <v-icon class="mainWrapperIcon">explore</v-icon>
        Explore
      </h3>
       <v-layout row wrap>
          <v-flex v-for="i in myDapps" :key="`2${i.title}`" xs2 class="appView">
            <v-card class="dappCard">
              <v-card-media :src="i.logo" height="135px" class="dappLogo">
              </v-card-media>
              <v-card-title primary-title >
                <v-card-text>
                  <h3 class="appTitle text-xs-center">{{ i.title }}</h3>
                </v-card-text>
              </v-card-title>
            </v-card>
          </v-flex>
        </v-layout>
    </div>

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
      myDapps: [
        // {
        //   logo: 'https://decentube.com/dist/logo.svg',
        //   title: 'Decentube'
        // },
        // {
        //   logo: '',
        //   title: 'Dcourt'
        // },
        // {
        //   logo: 'http://www.economicsgazette.com/wp-content/uploads/REP.png',
        //   title: 'Augur'
        // },
        // {
        //   logo: 'https://cdn.coinranking.com/r16I7Lud-/gno.svg',
        //   title: 'Gnosis'
        // },
        // {
        //   logo: 'https://i2.wp.com/www.crypto-news.in/wp-content/uploads/2017/12/cryptokitties-cryptonews-hedwig.png',
        //   title: 'CryptoKitties'
        // },
        // {
        //   logo: '',
        //   title: 'Digix'
        // }
      ],
      explore: []
    }
  },
  created () {
    var self = this
    this.$db.find({type: 'app', installed: true}, function (err, docs) {
      if (err) throw err
      self.myDapps = docs
    })
    this.$db.find({type: 'app', installed: { $ne: true }}, function (err, docs) {
      if (err) throw err
      self.explore = docs
    })
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
  }
}
</script>

<style scoped>
  .logoText {
    font-family: 'Dosis', sans-serif !important;
    font-weight: 700;
    font-size: 23px;
    color: #F7931E !important;
    position: absolute;
    margin-top: 9px;
    margin-left: -5px;
  }
  .grav {
    margin-top: 5px;
    border-radius: 99px;
    border: 2px solid #F7931E;
    cursor: pointer;
  }
  .mainWrapper {
    margin-top: 40px;
    margin-right: 90px;
    margin-left: 90px;
    min-height: 500px;
    font-family: 'Dosis', sans-serif;
    font-weight: 400;
    font-size: 26px;
    opacity: 0.8;
  }
  .mainWrapperIcon {
    font-size: 39px !important;
    margin-right: 5px;
    color: #F7931E;
    margin-top: -4px;
  }
  .MainWrapperTypo {
    margin-bottom: 25px;
    color: #F7931E;
  }
  .appView {
    margin-top: 15px;
    padding-right: 20px;
    padding-left: 20px;
    padding-bottom: 20px;
    width: 100%;

  }
  .appTitle {
    font-weight: 700;
    font-size: 22px;
    color: #F7931E;
    transition: color 800ms ease-in-out;
  }
  .dappLogo {
    margin-right: auto;
    margin-left: auto;
  }
  .appBody {
    font-weight: 300;
    font-size: 19px;
    display: none;
    transition: all 600ms ease-in-out;
  }
  .dappCard {
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    border: 2px solid #F7931E;
    background: transparent;
    border-radius: 5px;
    cursor: pointer;
    transition: margin-top 600ms ease-in-out;
  }
  .dappCard:hover {
    margin-top: -10px;
    background-image: linear-gradient(to right, #F37335 0%, #FDC830 100%);
    border: none;
  }
  .dappCard:hover  .appTitle {
    color: #222;
  }
  .dappCard:hover  .appBody {
    display: block;
    margin-top: -180px;
  }
  .dappCard:hover  .dappLogo {
    opacity: 0;
  }
  .background {
    background-color: #222;
  }
</style>
