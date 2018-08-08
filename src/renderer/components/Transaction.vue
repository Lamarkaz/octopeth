<template>
  <div>
    <v-btn @click.stop="signDialog = true" style="margin-top: 150px">Open</v-btn>
    <v-dialog
      v-model="signDialog"
      max-width="500" 
    >
      <v-card class="confirm">
        <v-card-title class="headline" style="font-size: 28px; font-family: 'Dosis'">Confirm a Transaction</v-card-title>
        <v-card-text style="width: 90%; margin-right: auto; margin-left: auto">
          <center>
            <v-gravatar :hash="md5hash" :size="50" class="grav" slot="activator" style="margin-right: 30px"/>
            <v-icon class="arrow">trending_flat</v-icon>
            <v-avatar size="50" class="appAvatar">
              <img src="http://lh3.googleusercontent.com/dj8kVcmXUj5bBzOG3xnKqPamTRWk9wyI1_aQufFbO4zmjECo8alVkssw9oibcEtnHzc=w170-rw" alt="avatar">
            </v-avatar>
            <h3 class="address">{{ '0x' + this.$store.state.auth.user.address }}</h3>
            <h3 class="appTitle">Gnosis</h3>
            <v-tooltip bottom color="black">
              <v-chip slot="activator" color="purple darken-4" text-color="white" style="margin-right: 115px; margin-top: 5px; padding: 0px 5px; font-weight: 600; font-family: 'Dosis'; font-size: 13px" disabled>
                Balance: {{$store.state.auth.user.balance}} ETH
              </v-chip>
              <span>0 USD</span>
            </v-tooltip>
          </center>
          <v-layout row wrap>
            <v-flex :key="12" xs12 style="margin-left: auto; margin-right: auto; margin-top: 25px; max-width: 85%">
              <v-tooltip right color="black">
                <v-text-field
                  slot="activator" 
                  name="input-10-1"
                  v-model="transAmount"
                  label="Amount"
                  color="white"
                  suffix="ETH"
                  disabled
                  dark
                  >
                </v-text-field>
                <span>0 USD</span>
              </v-tooltip>
              <v-text-field 
                name="input-10-1"
                v-model="gasPrice"
                label="Gas Price"
                color="white"
                suffix="UNITS"
                dark
                required
                >
              </v-text-field>
              <v-text-field 
                name="input-10-1"
                v-model="gasLimit"
                label="Gas Limit"
                color="white"
                suffix="GWEI"
                dark
                required
                >
              </v-text-field>
              <v-tooltip right color="black">
                <v-text-field 
                  slot="activator"
                  name="input-10-1"
                  v-model="maxTransFee"
                  label="Max Transaction Fee"
                  color="white"
                  suffix="ETH"
                  disabled
                  dark
                  >
                </v-text-field>
                <span>0 USD</span>
              </v-tooltip>
              <v-tooltip right color="black">
                <v-text-field 
                  slot="activator"
                  name="input-10-1"
                  v-model="maxTotal"
                  label="Max Total"
                  color="purple darken-2"
                  suffix="ETH"
                  disabled
                  autofocus
                  dark
                  >
                </v-text-field>
                <span>0 USD</span>
              </v-tooltip>
            </v-flex>
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
            Reject
          </v-btn>

          <v-btn
            color="green darken-1"
            flat="flat"
            class="genBtn"
          >
            Confirm
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
      transAmount: 0,
      gasPrice: 181978,
      gasLimit: 60,
      maxTransFee: 0.010918,
      maxTotal: 0.010918
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
  .confirm {
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
