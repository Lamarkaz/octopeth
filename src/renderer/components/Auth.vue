<template>
    <v-layout class="authLayout">
        <div class="leftWrapper">
          <div class="logoShow" style="margin-left: -90px; position: absolute">
          <img src="../assets/logo-dark.svg" width="800px"/>
          <center>
            <h3 style="font-family: 'Dosis', sans-serif !important; font-weight: 700; font-size: 48px; color: #222">OCTOPETH</h3>
          </center>
        </div>
        </div>
        <v-container class="authOverlay">
            <v-flex style="margin-left: auto; margin-right: auto; margin-top: 70px; max-width: 530px">
                <v-card class="authCard">
                    <v-alert v-if="error" color="error" icon="warning" value="true" style="margin-top: -45px">
                    Error: please make sure you upload a valid identity file and enter the correct decryption password
                    </v-alert>
                    <v-icon style="font-size: 55px; padding-right: 10px; color: #F7931E; left: 42%; margin-bottom: 20px; position: relative; border-radius: 50%">fingerprint</v-icon>
                    <br/>
                    <div style="text-align: center; margin-bottom: 30px; font-size: 16px; font-weight: 600">Already a user?<br/><span style="color: grey; font-size: 15px; font-weight: 300">Import your Identity file and credentials to start</span></div>
                    <form class="authForm">
                        <v-text-field class="inputStyle"
                        prepend-icon="attach_file" single-line
                        v-model="filename" :label="label"
                        @click.native="onFocus"
                        :disabled="disabled"
                        :rules="[v => !!v || 'Identity file is required!']"
                        ref="fileTextField"
                        dark
                        loading
                        required
                        ></v-text-field>
                        <input type="file" :multiple="false" :disabled="disabled" ref="fileInput" @change="onFileChange"></input>
                        <v-text-field class="inputStyle"
                            v-model="password"
                            prepend-icon="lock" single-line
                            name="input-10-1"
                            label="Enter your password"
                            hint="At least 8 characters"
                            min="8"
                            :append-icon="passBol ? 'visibility' : 'visibility_off'"
                            :append-icon-cb="() => (passBol = !passBol)"
                            :type="passBol ? 'password' : 'text'"
                            counter
                            dark
                            required
                        ></v-text-field>
                        <v-btn :disabled="!valid" class="authBtn" style="background-color: #cecece" v-on:click="authenticate">
                            <v-icon style="font-size: 20px; padding-right: 10px;">vpn_key</v-icon>Authenticate
                        </v-btn>
                        <div class="dividerStyle"></div>
                        <span style="color: grey; font-size: 15px; font-weight: 300; margin-top: 10px; margin-left: 22.5%">or create a new Identity</span>
                        <v-btn class="authBtn pulse" style="background-color: #F7931E; margin-top: 15px" v-on:click="dialog = true">
                            <v-icon style="font-size: 20px; padding-right: 10px">person_add</v-icon>Generate Identity
                        </v-btn>
                    </form>
                </v-card>
            </v-flex>
        </v-container>
        <!-- Password dialog -->
        <v-layout row justify-center>
          <v-dialog v-model="dialog" persistent max-width="500px">
            <v-card class="genId">
              <v-card-title>
                <span class="headline" style="font-family: 'Dosis', sans-serif; font-size: 21px"><v-icon style="font-size: 26px; padding-right: 6px; margin-top: -6px; color: #222">person_add</v-icon>Generate a new Identity</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12>
                      <v-text-field 
                      v-model="pw"
                      name="input-10-1"
                      color="secondary" 
                      prepend-icon="lock" single-line
                      hint="At least 8 characters"
                      :append-icon="newPassBol ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (newPassBol = !newPassBol)"
                      :type="newPassBol ? 'password' : 'text'"
                      counter
                      label="Select Password" 
                      required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field 
                      v-model="confirmpw"
                      name="input-10-1"
                      color="secondary" 
                      prepend-icon="done_all" single-line
                      :append-icon="confPassBol ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (confPassBol = !confPassBol)"
                      :type="confPassBol ? 'password' : 'text'" 
                      counter
                      label="Confirm Password" 
                      required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <div class="warningAlert" v-if="pw != confirmpw" type="error">
                <v-icon style="margin-right: 5px; font-size: 21px">warning</v-icon> passwords do not match
              </div>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="genBtn" @click.native="dialog = false">Cancel</v-btn>
                <v-btn class="genBtn" @click.native="generate()" :disabled="(pw != confirmpw || pw.length < 8)">Generate</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>
    </v-layout>
</template>


<script>
import ethers from 'ethers'

export default{
  props: {
    value: {
      type: [Array, String]
    },
    label: {
      type: String,
      default: 'Select an identity file..'
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
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
      dialog: false,
      pw: '',
      confirmpw: ''
    }
  },
  watch: {
    value (v) {
      this.filename = v
    }
  },
  mounted () {
    this.filename = this.value
  },

  methods: {
    onFocus () {
      if (!this.disabled) {
        this.$refs.fileInput.click()
      }
    },
    onFileChange ($event) {
      const files = $event.target.files || $event.dataTransfer.files
      var reader = new FileReader()
      reader.readAsText(files[0], 'UTF-8')
      var self = this
      reader.onload = (function (file) {
        return function (e) {
          function tryParseJSON (jsonString) {
            try {
              var o = JSON.parse(jsonString)
              if (o && typeof o === 'object') {
                return o
              }
            } catch (e) { }
            return false
          }
          if (tryParseJSON(e.target.result) !== false) {
            self.json = e.target.result
            if (files) {
              if (files.length > 0) {
                self.filename = [...files].map(file => file.name).join(', ')
              } else {
                self.filename = null
              }
            } else {
              self.filename = $event.target.value.split('\\').pop()
            }
          } else {
            alert('Error: Invalid wallet file')
          }
        }
      })(files[0])
    },
    authenticate () {
      var self = this
      this.ready = false
      ethers.Wallet.fromEncryptedWallet(this.json, this.password).then(function (wallet) {
        self.$db.update({type: 'wallet'}, {type: 'wallet', data: self.json}, {upsert: true}, function (err) {
          if (err) alert(err)
          else self.$store.commit('AUTH')
        })
      }).catch(function (e) {
        alert(e)
      })
      this.ready = true
    },
    generate: function () {
      var self = this
      this.ready = false
      this.dialog = false
      var wallet = ethers.Wallet.createRandom()
      var encrypted = wallet.encrypt(this.pw, function (pc) {
        if (pc === 1) {
          encrypted.then(function (json) {
            self.$db.update({type: 'wallet'}, {type: 'wallet', data: json}, {upsert: true}, function (err) {
              if (err) alert(err)
              else self.$store.commit('AUTH')
            })
          })
        }
      })
    }
  },
  computed: {
    valid: function () {
      return (this.json !== '' && this.password.length > 7)
    }
  }
}
</script>


<style scoped>
.authLayout {
    background-image: linear-gradient(to right, #F37335 0%, #efbb1f 100%); /* #efbb1f */
    background-size: 63% 100%;
}
.authOverlay {
    background: #222;
    position: absolute;
    width: 38%;
    height: 100%;
    right: 0;
}
.mainAuth {
    width: 70%;
    margin-right: auto;
    margin-left: auto;
}
input[type=file] {
    position: absolute;
    left: -99999px;
}
.authCard {
  width: 85%;
  margin-right: auto;
  margin-left: auto;
  box-shadow: none;
  padding-bottom: 5px;
  color: #F7931E;
  background: transparent;
}
.authForm {
  padding-left: 10%;
  padding-right: 15%;
}
.inputStyle {
  color: #F7931E;
}
.dividerStyle {
  margin-top: 30px;
  margin-bottom: 30px;
  border-bottom: 1px grey solid;
  opacity: 0.2;
}
.authBtn {
  margin-top: 20px;
  height: 45px;
  color: black;
  box-shadow: none;
  width: 100%;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 700;
  font-family: 'Dosis', sans-serif !important;
}
.pulse {
  display: inline-block;
  cursor: pointer;
  box-shadow: 0 0 0 rgba(204,169,44, 0.4);
  animation: pulse 2s infinite;
}
.pulse:hover {
  animation: none;
}
.leftWrapper {
  position: absolute;
  left: 7.5%;
  top: 13%;
  margin-left: auto;
  margin-right: auto;
}
.logoShow {
  width: auto;
}
.genId {
  background: #F7931E;
  padding: 15px;
}
.genBtn {
  font-family: 'Dosis', sans-serif;
  font-weight: 700;
  font-size: 16px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 900px;
}
.genBtn {
  font-family: 'Dosis', sans-serif;
  font-weight: 700;
}
.warningAlert {
  margin-left: 25px;
  margin-bottom: 15px;
  padding-left: 10px;
  font-family: 'Dosis';
  color: rgba(0,0,0,.5);
  font-weight: 500;
  font-size: 15px;
}
/* Animation */
@-webkit-keyframes pulse {
  0% {
    -webkit-box-shadow: 0 0 0 0 rgba(204,169,44, 0.4);
  }
  70% {
      -webkit-box-shadow: 0 0 0 12px rgba(204,169,44, 0);
  }
  100% {
      -webkit-box-shadow: 0 0 0 0 rgba(204,169,44, 0);
  }
}
@keyframes pulse {
  0% {
    -moz-box-shadow: 0 0 0 0 rgba(204,169,44, 0.4);
    box-shadow: 0 0 0 0 rgba(204,169,44, 0.4);
  }
  70% {
      -moz-box-shadow: 0 0 0 12px rgba(204,169,44, 0);
      box-shadow: 0 0 0 12px rgba(204,169,44, 0);
  }
  100% {
      -moz-box-shadow: 0 0 0 0 rgba(204,169,44, 0);
      box-shadow: 0 0 0 0 rgba(204,169,44, 0);
  }
}
</style>
