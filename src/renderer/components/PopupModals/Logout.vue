<template>
  <v-dialog
  max-width="390" 
  :value="value"
  @input="$emit('input')"
  >
    <v-card class="logoutAlert">
      <v-card-title class="headline" style="font-size: 28px; font-family: 'Dosis'">Are you sure you want to logout?</v-card-title>
      <v-card-text style="color: rgba(255,255,255,0.8)">
        Make sure to export your identity file before logging out to be able to login again.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="red darken-1"
          flat="flat"
          @click="$store.dispatch('deauthenticate')"
          class="genBtn"
        >
          Logout
        </v-btn>

        <v-btn
          color="green darken-1"
          flat="flat"
          class="genBtn"
          @click="exportIdentity()"
        >
          Export Identity File
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import FileSaver from 'file-saver'
import swal from 'sweetalert'

export default {
  props: ['value'],
  methods: {
    exportIdentity: function () {
      var identity = this.$store.state.auth.user
      delete identity.interval
      delete identity.balance
      var blob = new Blob([JSON.stringify(identity)], {type: 'text/plain;charset=utf-8'})
      FileSaver.saveAs(blob, 'identity.json')
      swal('Identity Saved!', 'Identity file is saved successfully', 'success', {buttons: false})
    }
  }
}
</script>

<style scoped>
.logoutAlert {
  border-top: solid 4px rgb(107, 32, 172);
  background: #222;
  color: white;
  padding-top: 10px;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 10px;
}
.headline {
  font-size: 28px;
  font-family: 'Dosis'
}
.genBtn {
  font-family: 'Dosis', sans-serif;
  font-weight: 700;
  font-size: 16px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 900px;
}
</style>

