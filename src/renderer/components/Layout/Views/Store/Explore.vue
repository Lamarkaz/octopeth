<template>
  <v-app style="background: #f6f6f6">
    <div class="mainWrapper">
      <v-container grid-list-xl pb-4>
        <div class="welcomeBox">
          <div class="greetings">
            <h1 class="greHead" style="margin-left: 90px">Welcome</h1>
            <h1 class="greHead" style="margin-top: -15px; margin-left: 90px">to the Store.</h1>
          </div>
        </div>
        <v-container no-padding fluid grid-list-xl>
          <v-layout row wrap style="margin-left: 70px">
            <v-flex v-for="i in $store.state.dapps.explore" :key="`3${i.title}`" xs12 sm6 md4 lg3 xl2 style="max-width: 230px; margin-left: 5px; margin-right: 5px; float: left" v-show="$store.state.dapps.cat === 'ALL' || $store.state.dapps.cat === '0' || i.cat === $store.state.dapps.cat">
              <v-card color="secondary" style="border-radius: 0px; box-shadow: none" v-if="$store.state.dapps.cat === 'ALL' || $store.state.dapps.cat === '0' || i.cat === $store.state.dapps.cat">
                  <v-card class="dappCard px-0" style="height: 200px">
                  <v-progress-linear v-if="installingKey == titleDM5(i)" class="installProg" color="purple darken-3" :indeterminate="true" height="4"></v-progress-linear>
                  <v-card-media src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0%0D%0Ab3I6IEFkb2JlIElsbHVzdHJhdG9yIDE3LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZl%0D%0AcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8v%0D%0ARFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQv%0D%0Ac3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6%0D%0ALy93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5%0D%0AOS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHdpZHRoPSIzNTguNDc0cHgiIGhlaWdodD0iMzM4%0D%0ALjI0M3B4IiB2aWV3Qm94PSIwIDAgMzU4LjQ3NCAzMzguMjQzIiBzdHlsZT0iZW5hYmxlLWJhY2tn%0D%0Acm91bmQ6bmV3IDAgMCAzNTguNDc0IDMzOC4yNDM7Ig0KCSB4bWw6c3BhY2U9InByZXNlcnZlIj4N%0D%0ACjxwYXRoIHN0eWxlPSJmaWxsOiMwMDk3YTciIGQ9Ik0zNTEuMDk5LDE1My4xMDlMMTg1LjU0NCw0%0D%0ALjgyNGMtOS44MzMtOC44MDctMTcuODc3LTUuMjEyLTE3Ljg3Nyw3Ljk4OHYyMi4zMWgtNjQuOTYx%0D%0ADQoJYy0xLjgyMS04LjAxMy04Ljk3NC0xNC0xNy41MzktMTRjLTkuOTQxLDAtMTgsOC4wNTktMTgs%0D%0AMThjMCwzLjYzNSwxLjA4Niw3LjAxMiwyLjkzOSw5Ljg0Mkw1Ni42MzEsNjAuNzM4DQoJYy0yLjMy%0D%0AOS0xLjg0Mi01LjI2NS0yLjk1LTguNDY1LTIuOTVjLTcuNTQ4LDAtMTMuNjY3LDYuMTE5LTEzLjY2%0D%0ANywxMy42NjdzNi4xMTksMTMuNjY3LDEzLjY2NywxMy42NjcNCgljNC40MDksMCw4LjMxOS0yLjA5%0D%0ANywxMC44MTgtNS4zMzhsMzYuMTgxLDE4LjQ2N2MtMC42MzYsMS44NDItMC45OTksMy44MTItMC45%0D%0AOTksNS44NzFjMCw5Ljk0MSw4LjA1OSwxOCwxOCwxOA0KCWM0LjIxMiwwLDguMDc3LTEuNDU4LDEx%0D%0ALjE0NC0zLjg4MWwxMS45MjQsMTEuNDA1Yy0xLjQwOCwyLjE0OS0yLjIzNCw0LjcxNS0yLjIzNCw3%0D%0ALjQ3NmMwLDAuOTAzLDAuMDkzLDEuNzg1LDAuMjYsMi42MzkNCglsLTUxLjQ2MywyMC40NTdjLTMu%0D%0AMDk5LTUuNDI5LTguOTMyLTkuMDk2LTE1LjYzMS05LjA5NmMtOS45NDEsMC0xOCw4LjA1OS0xOCwx%0D%0AOGMwLDkuOTQxLDguMDU5LDE4LDE4LDE4DQoJYzYuMDQ4LDAsMTEuMzg2LTIuOTkyLDE0LjY1LTcu%0D%0ANTY2bDI2Ljc3NiwxMy45MmMtMC4zODMsMS4yNi0wLjU5MywyLjU5NS0wLjU5MywzLjk3OWMwLDIu%0D%0ANTEsMC42ODgsNC44NTUsMS44Nyw2Ljg3NmwtMTguODUyLDE2LjI2NQ0KCWMtMy4xNjgtMi43Nzgt%0D%0ANy4zMDYtNC40NzUtMTEuODUxLTQuNDc1Yy05Ljk0MSwwLTE4LDguMDU5LTE4LDE4YzAsMC42MTUs%0D%0AMC4wMzIsMS4yMjMsMC4wOTIsMS44MjJsLTM0LjE0OCw4LjM4Mw0KCWMtMi4xNDYtNC43MzctNi45%0D%0AMDUtOC4wMzgtMTIuNDQ0LTguMDM4QzYuMTE5LDIzNi4yODgsMCwyNDIuNDA3LDAsMjQ5Ljk1NWMw%0D%0ALDcuNTQ4LDYuMTE5LDEzLjY2NywxMy42NjcsMTMuNjY3DQoJYzIuNDU4LDAsNC43NTgtMC42NTgs%0D%0ANi43NTEtMS43OTNsMjEuMzU0LDI1LjI5OWMtMi44NTQsMy4xODUtNC42MDUsNy4zOC00LjYwNSwx%0D%0AMS45OTRjMCw5Ljk0MSw4LjA1OSwxOCwxOCwxOA0KCWM4LjU2NCwwLDE1LjcxOC01Ljk4NywxNy41%0D%0AMzktMTRoOTQuOTYxdjIyLjMxYzAsMTMuMiw4LjA0NSwxNi43OTQsMTcuODc3LDcuOTg3bDE2NS41%0D%0ANTUtMTQ4LjI4NQ0KCUMzNjAuOTMyLDE3Ni4zMjcsMzYwLjkzMiwxNjEuOTE2LDM1MS4wOTksMTUz%0D%0ALjEwOXogTTYxLjI2Niw3NS4zMzRjMC4zNjQtMS4yMzEsMC41NjctMi41MzEsMC41NjctMy44NzkN%0D%0ACgljMC0yLjU0MS0wLjcwNi00LjkxMi0xLjkxNC02Ljk1bDEzLjQ4MS0xMS43ODFjMy4xNTcsMi43%0D%0AMzMsNy4yNjMsNC4zOTgsMTEuNzY2LDQuMzk4YzguNTY0LDAsMTUuNzE4LTUuOTg3LDE3LjUzOS0x%0D%0ANGg2NC45NjF2NTcNCgloLTM3Ljk2MWMtMS44MjEtOC4wMTMtOC45NzQtMTQtMTcuNTM5LTE0Yy02%0D%0ALjA5NiwwLTExLjQ3NCwzLjAzOC0xNC43Myw3LjY3NEw2MS4yNjYsNzUuMzM0eiBNMTM1LjExNiwx%0D%0ANDQuNDA0DQoJYzIuNDIxLDMuODMyLDYuNjgzLDYuMzg1LDExLjU1MSw2LjM4NWM3LjU0OCwwLDEz%0D%0ALjY2Ny02LjExOSwxMy42NjctMTMuNjY3YzAtNy41NDgtNi4xMTktMTMuNjY3LTEzLjY2Ny0xMy42%0D%0ANjcNCgljLTIuOTc5LDAtNS43MjcsMC45NjQtNy45NzIsMi41ODFsLTExLjkzLTExLjQxMmMxLjM4%0D%0ANC0xLjkyLDIuMzk5LTQuMTE5LDIuOTQxLTYuNTAzaDM3Ljk2MXY1N0g4My43MDUNCgljLTAuMDIt%0D%0AMC4wODYtMC4wNDUtMC4xNy0wLjA2Ni0wLjI1NUwxMzUuMTE2LDE0NC40MDR6IE04My4xMjIsMTc1%0D%0ALjExOGMwLjIzLTAuNjUsMC40MjgtMS4zMTUsMC41ODQtMS45OTdoODMuOTYxdjU3SDk1LjcwNQ0K%0D%0ACWMtMC40NzEtMi4wNzQtMS4yOTktNC4wMS0yLjQxOC01Ljc0M2wxOC44NDUtMTYuMjU4YzIuMzM5%0D%0ALDEuODc0LDUuMzAzLDMuMDAyLDguNTM0LDMuMDAyYzcuNTQ4LDAsMTMuNjY3LTYuMTE5LDEzLjY2%0D%0ANy0xMy42NjcNCglzLTYuMTE5LTEzLjY2Ny0xMy42NjctMTMuNjY3Yy00LjM3MywwLTguMjU2LDIu%0D%0AMDYxLTEwLjc1OCw1LjI1N0w4My4xMjIsMTc1LjExOHogTTcyLjcwNSwyOTUuMTIyYy0xLjgyMS04%0D%0ALjAxMy04Ljk3NC0xNC0xNy41MzktMTQNCgljLTMuNTI0LDAtNi44MDEsMS4wMjgtOS41NzcsMi43%0D%0ANzhsLTIxLjM0OC0yNS4yOTFjMS45MzEtMi4zNTcsMy4wOTEtNS4zNjksMy4wOTEtOC42NTRjMC0w%0D%0ALjI2LTAuMDI1LTAuNTE0LTAuMDM5LTAuNzcxDQoJbDM0LjE2Ni04LjM4N2MyLjY1Myw2LjYzMyw5%0D%0ALjEyNiwxMS4zMjUsMTYuNzA3LDExLjMyNWM4LjU2NCwwLDE1LjcxOC01Ljk4NywxNy41MzktMTRo%0D%0ANzEuOTYxdjU3SDcyLjcwNXoiLz4NCjwvc3ZnPg0" height="130px" class="dappLogo">
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
                        <v-btn v-else class="installBtn" @click="install(i)"><v-icon style="font-size: 16px; margin-right: 5px">get_app</v-icon> INSTALL</v-btn>
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
      const branchRegex = /(?=root).*$/ // Non Negative Look-behind Regex for first word after 'tree/'
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
            'data.id': dapp.id
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
          return 'ALL'
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
        case '10':
          return 'OTHER'
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
  min-height: 1100px;
  font-family: 'Dosis', sans-serif;
  font-weight: 400;
  font-size: 26px;
  margin: 0 auto;
}
.mainWrapperIcon {
  font-size: 30px !important;
  margin-right: 5px;
  color: white;
  margin-top: -4px;
}
.MainWrapperTypo {
  margin-top: 105px;
  color: white;
  font-size: 20px;
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
.card__media__background {
  background-size: 90% !important;
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
  box-shadow: none;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 20px;
  background: white;
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
  margin-top: -170px;
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
  left: 27px;
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
.welcomeBox {
  width: 900px;
  height: 370px;
  background-color: black;
  margin: 90px auto;
}
.greetings {
  height: 100%;
  width: 50%;
  background-color: white;
  padding-top: 50px;
}
.greHead {
  margin-left: -30px;
  font-family: 'Chivo';
  font-weight: 900;
  color: black;
  font-size: 38px;
}
</style>
