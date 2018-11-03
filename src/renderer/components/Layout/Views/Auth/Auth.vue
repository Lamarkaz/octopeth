<template>
  <v-layout class="authLayout">
    <div class="leftWrapper">
      <v-carousel hide-delimiters interval=5500 style="margin-left: -70px; width:680px; box-shadow: none">
        <v-carousel-item
          key="1"
          src="imgs/create--assets.png"
        ></v-carousel-item>
        <v-carousel-item
          key="2"
          src="imgs/explore--assets.png"
        ></v-carousel-item>
        <v-carousel-item
          key="3"
          src="imgs/collect--assets.png"
        ></v-carousel-item>
      </v-carousel>
    </div>
    <v-container class="authOverlay">
      <v-flex style="margin-left: auto; margin-right: auto; margin-top: 35px; max-width: 530px">
        <v-card class="authCard">
          <v-alert v-if="error" color="error" icon="warning" value="true" style="margin-top: -45px">
          Error: please make sure you upload a valid identity file and enter the correct decryption password
          </v-alert>
          <v-icon style="font-size: 55px; padding-right: 10px; color: #6b20ac; left: 42%; margin-bottom: 20px; position: relative; border-radius: 50%">fingerprint</v-icon>
          <br/>
          <div style="text-align: center; margin-bottom: 30px; font-size: 16px; font-weight: 600">ALREADY A USER?<br/><span style="color: grey; font-size: 15px; font-weight: 300">Import your Identity file and credentials to start</span></div>
          <form class="authForm">
            <v-text-field class="inputStyle"
            prepend-icon="attach_file" single-line
            v-model="filename" :label="label"
            @click.native="onFocus"
            :disabled="disabled"
            :rules="[v => !!v || 'Identity file is required!']"
            ref="fileTextField"
            color="purple darken-3"
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
                color="purple darken-3"
                counter
                required
            ></v-text-field>
            <v-btn :disabled="!valid" class="authBtn" style="background-color: #cecece" :loading="loader" @click="authenticate">
                <v-icon style="font-size: 20px; padding-right: 10px;">vpn_key</v-icon>Authenticate
            </v-btn>
            <div class="dividerStyle"></div>
            <span style="color: grey; font-size: 15px; font-weight: 300; margin-top: 10px; margin-left: 22.5%">or create a new Identity</span>
            <v-btn class="authBtn pulse" style="background-color: #6b20ac; margin-top: 15px; color: white" @click="dialog = true">
                <v-icon style="font-size: 20px; padding-right: 10px; color: white">person_add</v-icon>Generate Identity
            </v-btn>
          </form>
        </v-card>
      </v-flex>
    </v-container>
    <!-- Generate Identity dialog -->
    <GenerateIdentity v-model="dialog"></GenerateIdentity>
  </v-layout>
</template>


<script>
import swal from 'sweetalert'
// Auth carousel assets
import '../../../../assets/create.png'
import '../../../../assets/explore.png'
import '../../../../assets/collect.png'

import GenerateIdentity from '@/components/PopupModals/GenerateIdentity.vue'

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
      confirmpw: '',
      loader: false
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
            swal('Error!: Invalid wallet file', 'Make sure your Identity file is correct', 'error')
          }
        }
      })(files[0])
    },
    authenticate () {
      var self = this
      this.ready = false
      try {
        this.$web3.eth.accounts.decrypt(this.json, this.password)
        self.$store.dispatch('authenticate', JSON.parse(self.json))
        this.ready = true
      } catch (e) {
        swal('Error!', e, 'error') // DOESN'T WORK
      }
    },
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
      return ['error', 'warning', 'success'][Math.floor(this.pw_progress / 40)]
    },
    confirmpw_color () {
      return ['error', 'warning', 'success'][Math.floor(this.confirmpw_progress / 40)]
    }
  },
  components: {
    'GenerateIdentity': GenerateIdentity
  }
}
</script>


<style scoped>
.authLayout { 
  background-image: linear-gradient(-160deg, #6175c7 0%, #9245ba 70%);
  background-size: 63% 100%;
  -webkit-app-region: drag;
  font-family: 'Open Sans';
}
.authOverlay {
    background: #ffffff;
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
  color: rgb(107, 32, 172);
}
.authForm {
  padding-left: 10%;
  padding-right: 15%;
}
.inputStyle {
  color: rgb(107, 32, 172);
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
  font-family: 'Open Sans', sans-serif !important;
}
.pulse {
  display: inline-block;
  cursor: pointer;
  box-shadow: 0 0 0 rgba(107, 32, 172, 0.4);
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
.application .theme--light.input-group input, .application .theme--light.input-group textarea, .theme--light .input-group input, .theme--light .input-group textarea {
  color: white;
  margin-bottom: 11px;
}
.input-group__details {
  max-width: calc(100%) !important;
}
.input-group__counter {
  color: white !important;
}
.intro-carousel .carousel__controls {
  background: red !important;
}
/* Animation */
@-webkit-keyframes pulse {
  0% {
    -webkit-box-shadow: 0 0 0 0 rgba(116, 44, 204, 0.4);
  }
  70% {
    -webkit-box-shadow: 0 0 0 12px rgba(116, 44, 204, 0.4);
  }
  100% {
    -webkit-box-shadow: 0 0 0 0 rgba(116, 44, 204, 0.4);
  }
}
@keyframes pulse {
  0% {
    -moz-box-shadow: 0 0 0 0 rgba(111, 44, 204, 0.4);
    box-shadow: 0 0 0 0 rgba(111, 44, 204, 0.4);
  }
  70% {
    -moz-box-shadow: 0 0 0 12px rgba(129, 44, 204, 0);
    box-shadow: 0 0 0 12px rgba(129, 44, 204, 0);
  }
  100% {
    -moz-box-shadow: 0 0 0 0 rgba(111, 44, 204, 0);
    box-shadow: 0 0 0 0 rgba(111, 44, 204, 0);
  }
}
</style>
