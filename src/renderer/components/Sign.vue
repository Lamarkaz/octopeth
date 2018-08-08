<template>
  <div>
    <v-btn @click.stop="signDialog = true" style="margin-top: 150px">Open</v-btn>
    <v-dialog
      v-model="signDialog"
      max-width="500" 
    >
      <v-card class="sign">
        <v-card-title class="headline" style="font-size: 28px; font-family: 'Dosis'">Sign a Transaction</v-card-title>
        <v-card-text style="width: 90%; margin-right: auto; margin-left: auto">
          <center>
            <v-gravatar :hash="md5hash" :size="50" class="grav" slot="activator" style="margin-right: 30px"/>
            <v-icon class="arrow">trending_flat</v-icon>
            <v-avatar size="50" class="appAvatar">
              <img src="http://lh3.googleusercontent.com/dj8kVcmXUj5bBzOG3xnKqPamTRWk9wyI1_aQufFbO4zmjECo8alVkssw9oibcEtnHzc=w170-rw" alt="avatar">
            </v-avatar>
            <h3 class="address">{{ '0x' + this.$store.state.auth.user.address }}</h3>
            <h3 class="appTitle">Gnosis</h3>
          </center>
          <v-layout row wrap>
            <v-flex :key="12" xs12 style="margin-left: -20px; margin-top: 15px">
              <v-card-text class="message">Hello, I'm a message. <br/> Please sign me.</v-card-text>
            </v-flex>
            <v-text-field 
              v-model="confirmpw"
              name="input-10-1"
              color="white"
              :append-icon="confPassBol ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (confPassBol = !confPassBol)"
              :type="confPassBol ? 'password' : 'text'" 
              counter
              dark
              label="Confirm Password" 
              required
              >
            </v-text-field>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            flat="flat"
            @click="$store.dispatch('deauthenticate')"
            class="genBtn"
          >
            Cancel
          </v-btn>

          <v-btn
            color="green darken-1"
            flat="flat"
            class="genBtn"
            :disabled="(confirmpw.length < 8)"
          >
            Sign
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import crypto from 'crypto'
export default {
  data () {
    return {
      signDialog: false,
      confirmpw: '',
      confPassBol: true
    }
  },
  computed: {
    md5hash: function () {
      return crypto.createHash('md5').update(this.$store.state.auth.user.address).digest('hex')
    }
  }
}
</script>

<style scoped>
  .sign {
    border-top: solid 4px rgb(107, 32, 172);
    background: #222;
    color: white;
    padding-top: 10px;
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 10px;
  }
  .grav {
    margin-top: 5px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 99px;
    cursor: pointer;
  }
  .address {
    font-family: 'Dosis';
    font-size: 16px;
    margin-top: 5px;
    margin-left: -105px;
    display: block;
    font-weight: 500;
    text-overflow: ellipsis;
    overflow: hidden; 
    width: 120px; 
    white-space: nowrap;
  }
  .appTitle {
    font-family: 'Dosis';
    font-size: 16px;
    margin-top: -24px;
    margin-left: 110px;
    display: block;
    font-weight: 500;
    text-overflow: ellipsis;
    overflow: hidden; 
    width: 120px; 
    white-space: nowrap;
  }
  .arrow {
    color: white;
    margin-top: -40px;
    margin-left: -20px;
    margin-right: 10px;
    font-size: 30px;
  }
  .appAvatar {
    margin-top: -42px;
  }
  .genBtn {
    font-family: 'Dosis', sans-serif;
    font-weight: 700;
    font-size: 16px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 900px;
  }
  .message {
    background-color: rgba(255,255,255,0.05);
    margin: 15px;
    border-radius: 3px;
    margin-left: 13px;
    height: 180px;
    font-family: 'Dosis';
    font-size: 16px;
    font-weight: 400;
  }
</style>
