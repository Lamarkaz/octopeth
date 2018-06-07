<template>
  <div class="background">
    <v-toolbar 
      fixed
      dark 
      flat
      height="90"
      class="background">
      <v-toolbar-title v-on:click="$router.push('/')">
        <img src="../assets/Logo.svg" width="70px" style="margin-left: 15px; cursor: pointer; margin-top: 10px"/>
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
    <div class="mainWrapper" style="margin-top: 160px">
      <h3 class="text-xs-center MainWrapperTypo">
        <v-icon class="mainWrapperIcon">cloud_download</v-icon>
        My dApps
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

    <v-spacer style="border-bottom: 2px solid rgba(0,0,0,0.15); width: 60%; margin-left: auto; margin-right: auto; margin-top: 40px"></v-spacer>

    <!-- explore view-->
    <div class="mainWrapper">
      <h3 class="text-xs-center MainWrapperTypo">
        <v-icon class="mainWrapperIcon">explore</v-icon>
        explore
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
export default {
  data () {
    return {
      myDapps: [
        {
          logo: 'https://decentube.com/dist/logo.svg',
          title: 'Decentube'
        },
        {
          logo: '',
          title: 'Dcourt'
        },
        {
          logo: 'http://www.economicsgazette.com/wp-content/uploads/REP.png',
          title: 'Augur'
        },
        {
          logo: 'https://cdn.coinranking.com/r16I7Lud-/gno.svg',
          title: 'Gnosis'
        },
        {
          logo: 'https://i2.wp.com/www.crypto-news.in/wp-content/uploads/2017/12/cryptokitties-cryptonews-hedwig.png',
          title: 'CryptoKitties'
        },
        {
          logo: '',
          title: 'Digix'
        }
      ]
    }
  }
}
</script>

<style scoped>
  .logoText {
    font-family: 'Dosis', sans-serif !important;
    font-weight: 700;
    font-size: 23px;
    color: F7931E !important;
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
    margin-top: 60px;
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
    text-transform: uppercase;
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
    font-size: 25px;
    color: #F7931E;
    transition: color 800ms ease-in-out;
  }
  .dappCard {
    padding: 15px;
    height: 200px;
    border: 2px solid #F7931E;
    background: transparent;
    border-radius: 5px;
    cursor: pointer;
    transition: all 600ms ease-in-out;
  }
  .dappCard:hover {
    background: #F7931E;
    margin-top: -15px;
  }
  .dappCard:hover  .appTitle {
    color: #222;
  }
  .dappLogo {
    width: 135px;
    margin: 50px;
    margin-right: auto;
    margin-left: auto;
  }
  .background {
    background-color: #222;
  }
</style>
