<template>
  <v-app style="background: #222">
    <div class="sideNav"></div>
    <div class="mainWrapper">
      <h3 class="text-xs-center MainWrapperTypo">
        <v-icon class="mainWrapperIcon">explore</v-icon>
        Explore
      </h3>
      <v-container grid-list-md text-xs-center>
      <v-layout align-center justify-center row>
        <v-flex v-for="i in $store.state.dapps.explore" :key="`3${i.title}`" lg2 style="max-width: 200px; margin-left: 5px; margin-right: 5px" v-if="$store.state.dapps.cat === 'ALL' || translateCat(i.cat) === $store.state.dapps.cat">
          <v-card dark color="secondary">
                <v-card class="dappCard px-0" style="height: 230px">
                <v-card-media :src="displayImg(i.logo)" height="130px" class="dappLogo">
                </v-card-media>
                <v-card-title primary-title >
                  <v-card-text>
                    <h3 class="appTitle text-xs-center">{{ i.title }}</h3>
                    <div class="categType">
                      <v-card-text class="text-xs-center categText">
                        <v-icon style="color: white; margin-right: 2px; margin-top: -5px"></v-icon> {{ translateCat(i.cat) }}
                      </v-card-text>
                    </div>
                    <div class="appBody text-xs-left">{{ i.desc }}</div>
                  </v-card-text>
                </v-card-title>
              </v-card>
          </v-card>
        </v-flex>
      </v-layout>
      </v-container>
    </div>
  </v-app>
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
      // explore: [
      //   {
      //     logo: '',
      //     title: 'Dcourt',
      //     category: 'social'
      //   },
      //   {
      //     logo: 'http://lh3.googleusercontent.com/sRmOaGKtn9ByTyHyEjPHLOqcgSdROfqiF7-q3P0B_8AkPywuZm-CDt1pX9z8Oob4Y3Od=w170-rw',
      //     title: 'Augur',
      //     category: 'other'
      //   },
      //   {
      //     logo: 'http://lh3.googleusercontent.com/dj8kVcmXUj5bBzOG3xnKqPamTRWk9wyI1_aQufFbO4zmjECo8alVkssw9oibcEtnHzc=w170-rw',
      //     title: 'Gnosis',
      //     category: 'other'
      //   },
      //   {
      //     logo: 'http://lh5.ggpht.com/0VYAvZLR9YhosF-thqm8xl8EWsCfrEY_uk2og2f59K8IOx5TfPsXjFVwxaHVnUbuEjc=w170-rw',
      //     title: 'CryptoKitties',
      //     category: 'gaming'
      //   },
      //   {
      //     logo: '',
      //     title: 'Digix',
      //     category: 'tokens'
      //   }
      // ],
      currentItem: 'tab-Home',
      items: [
        'App1', 'App2', 'App3', 'App4', 'App5', 'App6', 'App7', 'App8', 'App9'
      ]
    }
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
              self.$store.dispatch('updateMyDapps')
              self.$store.dispatch('updateExplore')
            })
          }).catch(function () {
            self.$electron.remote.dialog.showErrorBox('Error', 'The dApp logo could not be downloaded')
          })
        }).catch(function () {
          self.$electron.remote.dialog.showErrorBox('Error', 'The dApp contents could not be downloaded')
        })
      })
    },
    displayImg: function (img) {
      return 'data:image/jpeg;base64,' + btoa(img.buffer)
    },
    translateCat: function (i) {
      switch (i) {
        case '0':
          return 'OTHER'
        case '1':
          return 'GAMING'
        case '2':
          return 'ENTERTAINMENT'
        case '3':
          return 'FINANCE'
        case '4':
          return 'SOCIAL'
        case '5':
          return 'EXCHANGE'
        case '6':
          return 'GAMBLING'
        case '7':
          return 'TOKENS'
        case '8':
          return 'SHARING'
        case '9':
          return 'GOVERNANCE'
      }
    }
  }
}
</script>

<style scoped>
.application--wrap {
    background-color: #222;
  }
.mainWrapper {
    margin-right: 90px;
    margin-left: 90px;
    min-height: 500px;
    font-family: 'Dosis', sans-serif;
    font-weight: 400;
    font-size: 26px;
    opacity: 0.8;
  }
  .mainWrapperIcon {
    font-size: 35px !important;
    margin-right: 5px;
    color: rgb(107, 32, 172);
    margin-top: -4px;
  }
  .MainWrapperTypo {
    margin-bottom: 25px;
    color: rgb(107, 32, 172);
    font-size: 25px;
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
    width: 120%;
    margin-left: -10px;
    margin-top: 15px;
    font-weight: 500;
    font-size: 15px;
    position: relative;
    display: none;
    transition: all 600ms ease-in-out;
  }
  .dappCard {
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
  .dappCard:hover {
    margin-top: -7px;
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
  .background {
    background-color: #222;
  }
  .menuItemStyle {
    color: rgb(107, 32, 172);
    font-family: 'Dosis', sans-serif;
    font-size: 18px;
    font-weight: 500; 
  }
</style>
