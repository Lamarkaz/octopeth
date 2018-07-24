<template>
  <div class="">
    <div id="electron-titlebar"></div>
    <v-toolbar
      fixed
      dark
      flat
      tabs
      height="70"
      class="background"
      color="purple darken-3">
      <v-toolbar-title v-on:click="$router.push('/')">
        <img src="../assets/logo-dark.svg" width="45px" style="margin-left: 50px; cursor: pointer; margin-top: 10px; margin-right: 7.5px"/>
        <span class="logoText">OCTOPETH</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
        <v-chip color="grey darken-4" text-color="white" style="margin-right: 15px; padding: 0px 10px; font-weight: 600; font-family: 'Dosis'; font-size: 15px" disabled="">
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
            color="grey darken-4"
            slider-color="grey darken-1"
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
</style>
