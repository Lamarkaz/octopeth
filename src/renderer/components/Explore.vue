<template>
  <v-app style="background: #222">
    <div class="mainWrapper">
      <h3 class="text-xs-center MainWrapperTypo">
        <v-icon class="mainWrapperIcon">explore</v-icon>
        Explore
      </h3>
      <v-container grid-list-lg pb-4>
        <v-container no-padding fluid grid-list-xl>
          <v-layout justify-center row wrap>
            <v-flex v-for="i in $store.state.dapps.explore" :key="`3${i.title}`" xs12 sm6 md4 lg3 xl2 style="max-width: 230px; margin-left: 5px; margin-right: 5px; float: left" v-if="$store.state.dapps.cat === 'ALL' || translateCat(i.cat) === $store.state.dapps.cat">
              <v-card dark color="secondary">
                  <v-card class="dappCard px-0" style="height: 230px">
                  <v-progress-linear v-if="installingKey == titleDM5(i)" class="installProg" color="purple darken-3" :indeterminate="true" height="4"></v-progress-linear>
                  <v-card-media :src="displayImg(i.logo)" height="130px" class="dappLogo">
                  </v-card-media>
                  <v-card-title primary-title >
                    <v-card-text style="paddding-left: 0px; padding-right: 0px">
                      <h3 class="appTitle text-xs-center">{{ i.title }}</h3>
                      <div class="categType">
                        <v-card-text class="text-xs-center categText">
                          <v-icon style="color: white; margin-right: 2px; margin-top: -5px"></v-icon> {{ translateCat(i.cat) }}
                        </v-card-text>
                      </div>
                      <div class="appBody text-xs-left">{{ i.desc }} 
                        <v-btn v-if="installingKey == titleDM5(i)" class="installBtn" style="margin-left: 0px">INSTALLING...</v-btn>
                        <v-btn v-else class="installBtn" @click="install(i)">INSTALL</v-btn>
                      </div>
                    </v-card-text>
                  </v-card-title>
                </v-card>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-container>
    </div>
  </v-app>
</template>

<script>
import crypto from 'crypto'
import path from 'path'
import swal from 'sweetalert'

export default {
  data () {
    return {
      installingKey: '',
      installText: 'INSTALL'
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
    }
  },
  methods: {
    install: function (dapp) {
      var self = this
      self.installingKey = crypto.createHash('md5').update(dapp.title).digest('hex')
      self.installText = 'INSTALLING...'
      var directory = path.join(this.$electron.remote.app.getPath('userData'), '/apps/')
      const simpleGit = require('simple-git')(directory)
      const branchRegex = /(?=tree).*$/ // Non Negative Look-behind Regex for first word after 'tree/'
      const repoRegex = /^(.*[/])/ // Regex for everything before the last forward slash
      const repo = dapp.url
      var repoBranch = repo.match(branchRegex)[0].substr(5)
      var repoURL = repo.match(repoRegex)[0].slice(0, -6)
      console.log(directory, repoURL, repoBranch)
      simpleGit.clone(repoURL)
        .then(function () {
          swal(dapp.title + ' Installed', ' Ðapp Installed Successfully.', 'success')
          self.installing = false
          self.$db.update({
            'data.title': dapp.title
          },
          {
            $set: {
              'data.directory': directory,
              'data.installed': true
            }
          }, function (err) {
            if (err) throw err
            self.$store.dispatch('updateMyDapps')
            self.$store.dispatch('updateExplore')
          })
        })
        .catch(function (e) {
          self.$electron.remote.dialog.showErrorBox('Error', 'The dApp contents could not be downloaded: ' + e)
          swal('Error!', e, 'error')
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
    },
    titleDM5: function (i) {
      return crypto.createHash('md5').update(i.title).digest('hex')
    }
  }
}
</script>

<style scoped>
.application--wrap {
  background-color: #222;
}
.mainWrapper {
  margin-left: 200px;
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
  margin-top: 105px;
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
  border-radius: 3px;
}
.appBody {
  width: 120%;
  margin-left: -10px;
  margin-top: 15px;
  font-weight: 500;
  font-size: 14px;
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
.installBtn {
  left: 22px;
  top: 88px;
  background-color: rgb(107, 32, 172) !important;
  font-weight: 700;
  font-size: 13px;
  position: absolute;
  border-radius: 9999px;
  padding: 1px;
}
.installProg {
  margin-top: -20px;
  box-shadow: none;
}
</style>
