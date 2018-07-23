<template>
  <v-app style="background: #222">
    <div class="sideNav"></div>
    <div class="mainWrapper" style="margin-top: 50px">
      <h3 class="text-xs-center MainWrapperTypo">
        <v-icon class="mainWrapperIcon">archive</v-icon>
        My ÐApps
      </h3>
      <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex v-for="i in $store.dapps.state.myDapps" :key="`1${i}`" lg2 >
          <v-card dark color="secondary">
                <v-card class="dappCard px-0" style="height: 250px;">
                <v-card-media :src="i.logo" height="150px" class="dappLogo">
                </v-card-media>
                <v-card-title primary-title >
                  <v-card-text>
                    <h3 class="appTitle text-xs-center">{{ i.title }}</h3>
                    <div class="categType">
                      <v-card-text class="text-xs-center categText">
                        <v-icon style="color: white; margin-right: 2px; margin-top: -5px"></v-icon> GAMING
                      </v-card-text>
                    </div>
                    <div class="appBody text-xs-left">Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
                  </v-card-text>
                </v-card-title>
              </v-card>
          </v-card>
        </v-flex>
      </v-layout>
      </v-container>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex
            v-for="i
            in $store.dapps.state.myDapps"
            :key="`2${i.title}`"
            lg1
            offset-2
            class="appView"
          >
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      // myDapps: [
      // {
      //     logo: 'http://lh3.googleusercontent.com/akv2Bdp7i5Vv-sl9FuP3_dhWpUO80zULf-Pkh6RFleomEp6pZorHuCNm3FbR9oAMunVK=w170-rw',
      //     title: 'Decentube',
      //     category: 'other'
      //   },
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
        'Home', 'Shopping', 'Videos', 'App1', 'App2', 'Images', 'App3', 'App4', 'App'
      ]
    }
  }
}
</script>

<style scoped>
.application--wrap {
    background-color: #222;
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
    font-size: 35px !important;
    margin-right: 5px;
    color: rgb(107, 32, 172);
    margin-top: -4px;
  }
  .MainWrapperTypo {
    margin-top: 100px;
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
    padding-top: 10px;
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
