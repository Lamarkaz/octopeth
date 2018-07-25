<template>
  <div id="app">
    <v-app id="electron-titlebar" class="drag">
      <!-- Customized title-bar -->
      <!-- main router view -->
      <router-view v-if="$store.state.auth.authed"></router-view>
      <!-- authentication view -->
      <Auth v-else></Auth>
    </v-app>
  </div>
</template>

<script>
  // import download from 'electron-dl'
  export default {
    name: 'octopeth',
    created () {
      // DELETE. ONLY FOR TESTING
      this.$db.remove({}, { multi: true })
      // END
      var self = this
      this.$db.count({type: 'wallet'}, function (err, count) {
        if (err) alert(err)
        if (count > 0) self.$store.commit('AUTH')
      })
      window.electron = this.$electron // DELETE IN PRODUCTION
      window.contract = this.$contract
      this.$contract.getPastEvents('Publish', {fromBlock: 0}, function (err, arr) {
        if (!err) {
          arr.forEach(function (e) {
            // var values = e.returnValues
            // download(self.$electron.remote.BrowserWindow.getFocusedWindow(), values.logo, {directory:''})
            // self.$db.insert({
            //   type:'app',
            //   data:{
            //     title: values.title,
            //     logo: path.join(remote.app.getPath('userData'), '/logos/' + count + 1 + '/' + filename),
            //     installed: true,
            //     id: count + 1
            //   }
            // })
          })
          self.$store.dispatch('updateMyDapps')
          self.$store.dispatch('updateExplore')
        } else {
          console.log(err)
        }
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
