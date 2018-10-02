<template>
  <v-app style="background: #222">
    <div class="mainWrapper">
      <h3 class="text-xs-center MainWrapperTypo">
        <v-icon class="mainWrapperIcon">archive</v-icon>
        My ÐApps
      </h3>
      <v-container grid-list-lg pb-4>
        <v-container no-padding fluid grid-list-xl>
          <v-layout justify-center row wrap>
            <v-flex v-for="i in $store.state.dapps.myDapps" :key="`1${i.title}`" xs12 sm6 md4 lg3 xl2  style="max-width: 230px; margin-left: 5px; margin-right: 5px" v-if="$store.state.dapps.cat === 'ALL' || translateCat(i.cat) === $store.state.dapps.cat">
              <v-card dark color="secondary">
                    <v-card class="dappCard px-0" style="height: 240px">
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
      </v-container>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex
            v-for="i
            in $store.state.dapps.myDapps"
            :key="`2${i.title}`"
            lg1
            offset-2
            class="appView"
            v-if="$store.state.dapps.cat === 'ALL' || translateCat(i.cat) === $store.state.dapps.cat"
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
      currentItem: 'tab-Home'
    }
  },
  methods: {
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
    margin-top: 40px;
    min-height: 500px;
    font-family: 'Dosis', sans-serif;
    font-weight: 400;
    font-size: 26px;
    opacity: 0.8;
  }
  .mainWrapperIcon {
    font-size: 30px !important;
    margin-right: 5px;
    color: white;
    margin-top: -4px;
  }
  .MainWrapperTypo {
    margin-top: 65px;
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
