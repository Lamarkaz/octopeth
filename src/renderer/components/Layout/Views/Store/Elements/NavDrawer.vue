<template>
  <v-navigation-drawer
      absolute
      permanent
      :mini-variant.sync="mini"
      stateless
      width="250"
      :clipped="clipped"
      v-model="drawer"
      class="greyish"
  >
    <v-list style="margin-top: 80px; padding-bottom: 0px">
      <v-list-tile @click="changeView('inventory')" :value="this.$store.state.dapps.currView == 'inventory'" active-class="grey darken-2">
        <v-list-tile-action>
          <v-icon>archive</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>My ÐApps</v-list-tile-title>
      </v-list-tile>
      <v-list-tile @click="changeView('explore')" :value="this.$store.state.dapps.currView == 'explore'" active-class="grey darken-2">
        <v-list-tile-action>
          <v-icon>whatshot</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Discover</v-list-tile-title>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile @click="changeView('publisher')" :value="this.$store.state.dapps.currView == 'publisher'" active-class="grey darken-2">
        <v-list-tile-action>
          <v-icon>apps</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Publisher Portal</v-list-tile-title>
      </v-list-tile>
    </v-list>
    <v-divider></v-divider>
    <v-list>
      <v-list-tile-action>
        <v-btn
          icon
          @click.stop="mini = !mini"
          style="margin-left: auto; margin-right: auto; margin-top: 0px; margin-bottom: 0px"
        >
          <v-icon v-if="mini == false">chevron_left</v-icon>
          <v-icon v-if="mini == true">chevron_right</v-icon>
        </v-btn>
      </v-list-tile-action>
    </v-list>
    <v-divider></v-divider>
    <v-list v-if="mini == false"
        max-height
        class="greyish"
      >
        <v-list-tile>
          <v-list-tile-title style="font-family: 'Open Sans'; font-size: 11px; opacity: 0.7">Categories</v-list-tile-title>
        </v-list-tile>

        <v-list-tile
          v-for="(category, i) in categories"
          :key="i"
          @click="changeCat(category.value)"
          :value="$store.state.dapps.cat == category.value"
          active-class="grey darken-2"
        >
          <v-list-tile-title v-text="category.item" style="font-size: 12px; font-weight: 700; font-family: 'Open Sans'"></v-list-tile-title>
          <v-list-tile-action>
            <v-icon style="color: #868d96" v-text="category.icon"></v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data () {
    return {
      drawer: true,
      clipped: true,
      currentView: 'inventory',
      mini: true,
      categories: [
        { item: 'ALL', value: '0', icon: 'category' },
        { item: 'GAMING', value: '1', icon: 'videogame_asset' },
        { item: 'ENTERTAINMENT', value: '2', icon: 'local_movies' },
        { item: 'FINANCE', value: '3', icon: 'account_balance_wallet' },
        { item: 'SOCIAL', value: '4', icon: 'group' },
        { item: 'EXCHANGE', value: '5', icon: 'compare_arrows' },
        { item: 'GAMBLING', value: '6', icon: 'local_play' },
        { item: 'TOKENS', value: '7', icon: 'attach_money' },
        { item: 'SHARING', value: '8', icon: 'share' },
        { item: 'GOVERNANCE', value: '9', icon: 'account_balance' },
        { item: 'OTHER', value: '10', icon: 'more_horiz' }
      ]
    }
  },
  methods: {
    changeView: function (view) {
      this.$store.commit('CHANGEVIEW', view)
      // console.log(this.$store.state.dapp.currView)
    },
    changeCat: function (name) {
      this.$store.commit('CHANGECAT', name)
    }
  }
}
</script>

<style>
.greyish {
  background-color: #b1bac5;
}
</style>


