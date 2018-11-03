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
  export default {
    name: 'Octopeth',
    created: async function () {
      // DELETE. ONLY FOR TESTING
      this.$db.remove({}, { multi: true })
      // END
      var self = this
      this.$db.findOne({type: 'wallet'}, function (err, doc) {
        if (err) alert(err)
        if (doc !== null) self.$store.dispatch('authenticate', doc.data)
      })
      window.electron = this.$electron // DELETE IN PRODUCTION
      window.contract = this.$contract
      this.$store.dispatch('updateExplore')
      this.$store.dispatch('updateMyDapps')
      var numdApps = await this.$contract.methods.numdApps().call()
      for (var i = 1; i <= numdApps; i++) {
        self.$contract.methods.getDApp(i).call().then(function (values) {
          values.id = i
          self.$helpers.validateDApp(values).then(function (img) {
            self.$db.insertdApp(values, img).then(function () {
              self.$store.dispatch('updateExplore')
              self.$store.dispatch('updateMyDapps')
            }).catch(console.log)
          }).catch(console.log)
        })
      }
    }
  }
</script>

<style>
  /* @import '../../node_modules/typeface-dosis/index.css'; */
@import url('https://fonts.googleapis.com/css?family=Chivo:700,900|Open+Sans:400,700');

  body {
    font-family: 'Open Sans', sans-serif !important;
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
