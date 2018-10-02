<template>
  <v-dialog 
  :value="value"
  @input="$emit('input')" 
  persistent 
  max-width="500px" 
  dark
  > <!-- https://stackoverflow.com/questions/49315487/vuejs-error-avoid-mutating-a-prop-directly?noredirect=1&lq=1 -->
    <v-card class="genId" background="#222">
      <v-card-title>
        <span class="headline"><v-icon style="font-size: 26px; padding-right: 10px; margin-top: -6px; color: white">person_add</v-icon>Generate a new Identity</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field 
              v-model="pw"
              name="input-10-1"
              color="white" 
              hint="At least 8 characters"
              :append-icon="newPassBol ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (newPassBol = !newPassBol)"
              :type="newPassBol ? 'password' : 'text'"
              counter
              dark
              loading
              label="Select Password" 
              required
              >
                <v-progress-linear
                  slot="progress"
                  :value="pw_progress"
                  :color="pw_color"
                  height="3"
                ></v-progress-linear>
              </v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field 
              v-model="confirmpw"
              name="input-10-1"
              color="white"
              :append-icon="confPassBol ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (confPassBol = !confPassBol)"
              :type="confPassBol ? 'password' : 'text'" 
              counter
              dark
              loading
              label="Confirm Password" 
              required
              >
                <v-progress-linear
                  slot="progress"
                  :value="confirmpw_progress"
                  :color="confirmpw_color"
                  height="3"
                ></v-progress-linear>
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <div class="warningAlert" v-if="pw != confirmpw" type="error">
        <v-icon style="margin-right: 5px; font-size: 21px; color: #FF4151">warning</v-icon> passwords do not match
      </div>
      <div class="warningAlert" v-else-if="pw.length > 25" type="error">
        <v-icon style="margin-right: 5px; font-size: 21px; color: #FF4151">warning</v-icon> password is too long
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="genBtn" color="red darken-1" flat="flat" @click.native="$emit('input')">Cancel</v-btn>
        <v-btn class="genBtn" color="green darken-1" flat="flat" :loading="loader" @click.native="generate()" :disabled="(pw != confirmpw || pw.length < 8 || pw.length > 25)">Generate</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['value'],
  data () {
    return {
      filename: '',
      passBol: true,
      newPassBol: true,
      confPassBol: true,
      password: '',
      newPassword: '',
      confPassword: '',
      json: {},
      ready: true,
      error: false,
      pw: '',
      confirmpw: '',
      loader: false
    }
  },
  methods: {
    generate: function () {
      this.ready = false
      this.loader = true
      var privkey = this.$web3.eth.accounts.create().privateKey
      var encrypted = this.$web3.eth.accounts.encrypt(privkey, this.pw)
      this.$store.dispatch('authenticate', encrypted)
    }
  },
  computed: {
    valid: function () {
      return (this.json !== '' && this.password.length > 7)
    },
    pw_progress () {
      return Math.min(100, this.pw.length * 10)
    },
    confirmpw_progress () {
      return Math.min(100, this.confirmpw.length * 10)
    },
    pw_color () {
      if (this.pw.length > 25) {
        return 'error'
      } else {
        return ['error', 'warning', 'success'][Math.floor(this.pw_progress / 40)]
      }
    },
    confirmpw_color () {
      return ['error', 'warning', 'success'][Math.floor(this.confirmpw_progress / 40)]
    }
  }
}
</script>

<style scoped>
.genId {
  border-top: solid 4px rgb(107, 32, 172);
  background: #222;
  padding: 15px;
}
.headline {
  font-family: 'Dosis', sans-serif; 
  font-size: 23px !important; 
  font-weight: 600; 
  color: white;
}
.warningAlert {
  margin-left: 25px;
  margin-top: 10px;
  margin-bottom: 15px;
  padding-left: 10px;
  font-family: 'Dosis';
  color: #FF4151;
  font-weight: 500;
  font-size: 15px;
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
