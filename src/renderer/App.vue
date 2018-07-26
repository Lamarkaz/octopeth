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
  import imageType from 'image-type'
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
            var values = e.returnValues
            const xhr = new XMLHttpRequest()
            // TODO: Check if logo is URL
            xhr.open('GET', decodeURIComponent(values.logo))
            xhr.responseType = 'arraybuffer'
            xhr.onload = () => {
              var res = xhr.response
              var imgType = imageType(new Uint8Array(res))
              if (imgType != null) {
                self.$db.findOne({'data.title': values.title}, function (err, doc) {
                  if (!err) {
                    if (doc === null) {
                    // TODO: Check approval event by the Octopeth owner before inserting
                    // TODO Check image dimensions before inserting
                    // TODO: Consider implementing OOP for image validation
                    // TODO: Set a download file size limit to prevent use of excessively large files
                      self.$db.insert({
                        type: 'app',
                        data: {
                          title: values.title,
                          url: decodeURIComponent(values.url),
                          contact: values.contact,
                          hash: values.hash,
                          cat: values.cat,
                          owner: values.owner,
                          desc: values.desc,
                          approved: values.approved,
                          logo: {buffer: res, type: imgType},
                          installed: false
                        }
                      }, function (err) {
                        if (!err) {
                          self.$store.dispatch('updateExplore')
                          self.$store.dispatch('updateMyDapps')
                        } else {
                          console.log('Error inserting to DB: ' + values.title)
                        }
                      })
                    } else {
                    // What if app already exists in explore or inventory?
                    // What if app already exists but remote logo file was changed?
                    // What if app already was added in an earlier event and was updated in this event?
                    }
                  } else {
                    console.log('Error finding app in DB: ' + values.title)
                  }
                })
              } else {
                console.log('Error: dApp logo is not an image. Skipped ' + values.title)
              }
            }
            xhr.send()
          })
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
