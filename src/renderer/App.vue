<template>
  <div id="app">
    <v-app>
      <!-- main router view -->
      <router-view v-if="authed"></router-view>
      <!-- authentication view -->
      <Auth v-else></Auth>
    </v-app>
  </div>
</template>

<script>
  export default {
    name: 'octopeth',
    data () {
      return {
        authed: false
      }
    },
    created () {
      //
      this.$db.count({ address: { $regex: /^0x[a-fA-F0-9]{40}$/ } }, function (err, count) {
        if (err) throw err
        if (count > 0) this.authed = true
      })
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Dosis');

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
