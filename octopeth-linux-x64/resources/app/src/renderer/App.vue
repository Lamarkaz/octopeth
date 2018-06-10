<template>
  <div id="app">
    <v-app>
      <!-- main router view -->
      <router-view v-if="$store.state.auth.authed"></router-view>
      <!-- authentication view -->
      <Auth v-else></Auth>
    </v-app>
  </div>
</template>

<script>
  export default {
    name: 'octopeth',
    created () {
      // DELETE. ONLY FOR TESTING
      // this.$db.remove({}, { multi: true })
      // END
      var self = this
      this.$db.count({type: 'wallet'}, function (err, count) {
        if (err) alert(err)
        if (count > 0) self.$store.commit('AUTH')
      })
    }
  }
</script>

<style>
  @import '../../node_modules/typeface-dosis/index.css';

  body {
    font-family: 'Dosis', sans-serif !important;
    -ms-overflow-style: scrollbar;
    -webkit-app-region:drag !important;
  }
  input[type="submit"],
  input[type="reset"],
  input[type="button"],
  input[type="text"],
  button,
  textarea {
    -webkit-app-region: no-drag;
  }
</style>
