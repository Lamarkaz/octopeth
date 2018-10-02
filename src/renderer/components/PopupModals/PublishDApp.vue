<template>
  <v-dialog
  max-width="700"
  :value="value"
  @input="$emit('input')"
  persistent
  >
    <v-card class="PublishModal">
      <v-card-title class="headline">Publish a new ÐApp</v-card-title>
      <v-card-text style="width: 80%; margin-right: auto; margin-left: auto">
        <v-layout row wrap>
          <v-flex :key="8" xs8 style="margin-left: -25px">
            <v-text-field 
              name="input-10-1"
              v-model="dappTitle"
              label="ÐApp Title"
              color="white"
              dark
              required
              >
            </v-text-field>
            <v-text-field 
              v-model="dappURL"
              name="input-10-1"
              label="Git Repository URL"
              color="white"
              dark
              required
              >
            </v-text-field>
            <!-- <v-layout align-center>
              <v-switch v-model="enabled" hide-details color="white" class="shrink mr-2" dark></v-switch>
              <label style="font-size: 14px; margin-left: 15px; opacity: 0.7">Custom Branch</label>
              <v-text-field v-model="gitBranch" :disabled="!enabled" color="white" label="Git branch" dark style="margin-left: 20px; max-width: 60%; margin-right"></v-text-field>
            </v-layout> -->
            <v-layout align-center>
              <v-switch v-model="pathEnabled" hide-details color="white" class="shrink mr-2" dark></v-switch>
              <label style="font-size: 14px; margin-left: 15px; opacity: 0.7">Custom Path</label>
              <v-text-field v-model="dappPath" :disabled="!pathEnabled" color="white" label="Path" dark style="margin-left: 20px; max-width: 60%; margin-right"></v-text-field>
            </v-layout>
            <v-text-field 
              name="input-10-1"
              v-model="dappLogo"
              label="Logo URL"
              color="white"
              dark
              required
              >
            </v-text-field>
            <v-text-field 
              name="input-10-1"
              v-model="dappDesc"
              label="Description"
              color="white"
              counter=60
              dark
              required
              >
            </v-text-field>
            <v-select
              v-model="dappCateg"
              dark
              color="white"
              :items="categories"
              item-text="item"
              item-value="value"
              label="Category"
            ></v-select>
            <v-text-field
              v-model="dappContact" 
              name="input-10-1"
              label="Contact Email"
              color="white"
              dark
              required
              >
            </v-text-field>
          </v-flex>
          <v-flex :key="4" xs4>
              <h3 class="previewer">Your ÐApp Card Preview</h3>
              <v-card class="dappCard px-0" style="height: 240px; width: 230px">
              <v-card-media :src="dappLogo" height="130px" class="dappLogo">
              </v-card-media>
              <v-card-title primary-title >
                <v-card-text>
                  <h3 class="appTitle text-xs-center">{{ dappTitle }}</h3>
                  <div class="categType">
                    <v-card-text class="text-xs-center categText">
                      <v-icon style="color: white; margin-right: 2px; margin-top: -5px"></v-icon> {{ numToCat(dappCateg) }}
                    </v-card-text>
                  </div>
                  <div class="appBody text-xs-left">{{ dappDesc }}</div>
                </v-card-text>
              </v-card-title>
            </v-card>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="red darken-1"
          flat="flat"
          class="genBtn"
          @click="$emit('input')"
        >
          Cancel
        </v-btn>
        <v-btn
          color="green darken-1"
          flat="flat"
          class="genBtn"
          @click="publish"
        >
          Publish
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['value'],
  data () {
    return {
      dappLogo: '',
      dappTitle: '',
      dappDesc: '',
      dappCateg: '',
      dappURL: '',
      dappContact: '',
      explore: [],
      isOpen: false,
      enabled: false,
      pathEnabled: false,
      dappPath: '/tree/root',
      usdBalance: 0,
      categories: [
        { item: 'ALL', value: '0', icon: 'category' },
        { item: 'GAMING', value: '1', icon: 'videogame_asset' },
        { item: 'ENTERTAINMENT', value: '2', icon: 'local_movies' },
        { item: 'FINANCE', value: '3', icon: 'account_balance_wallet' },
        { item: 'SOCIAL', value: '4', icon: 'group' },
        { item: 'EXCHANGE', value: '5', icon: 'compare_arrows' },
        { item: 'GAMBLING', value: '6', icon: 'local_play' },
        { item: 'TOKENS', value: '7', icon: 'attach_money' },
        { item: 'SHARING', value: '8', icon: 'share' },
        { item: 'GOVERNANCE', value: '9', icon: 'account_balance' },
        { item: 'OTHER', value: '10', icon: 'more_horiz' }
      ]
    }
  },
  methods: {
    publish: function () {
      var self = this
      var privkey = this.$web3.eth.accounts.decrypt(this.$store.state.auth.user, '12345678').privateKey
      var tx = this.$contract.methods.publish(this.dappTitle, this.dappURL, this.dappContact, this.dappLogo, this.dappDesc, this.dappCateg)
      // .on('receipt', function (receipt) {
      //   console.log(receipt)
      //   swal('Ðapp Published', 'Ðapp is successfully published and is explorable.', 'success', {buttons: false})
      // })
      // .on('error', console.error)
      this.$web3.eth.accounts.signTransaction(tx, privkey, function (err, res) {
        if (err) console.log(err)
        self.$web3.eth.sendSignedTransaction(res)
      })
    },
    numToCat: function (num) {
      return this.$store.state.dapps.categories[num]
    }
  }
}
</script>

<style scoped>
.PublishModal {
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
.previewer {
  font-family: 'Dosis';
  font-weight: 500;
  font-size: 13px;
  color: rgba(255,255,255,0.5);
  margin-top: 40px;
  margin-left: 35px;
}
.appTitle {
  font-weight: 700;
  font-size: 22px;
  color: rgb(107, 32, 172);
  transition: color 800ms ease-in-out;
}
.dappLogo {
  padding: 15px;
  width: 130px;
  margin-right: auto;
  margin-left: auto;
}
.appBody {
  color: white;
  word-break: break-all;
  margin-left: -10px;
  margin-top: 10px;
  font-weight: 500;
  font-size: 14px;
  display: none;
  transition: all 600ms ease-in-out;
}
.dappCard {
  font-family: 'Dosis';
  margin: 30px;
  margin-top: 15px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 20px;
  background: rgba(0,0,0,0.4);
  border-radius: 5px;
  cursor: pointer;
  transition: margin-top 600ms ease-in-out;
}
.categType {
  width: 100%;
  height: 30px;
  left: 0px;
  bottom: 0px;
  background: rgba(0,0,0,.3);
  position: absolute;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  display: none;
  transition: none 600ms ease-in-out;
}
.categText {
  font-size: 13px;
  font-weight: 700;
  color: white;
  margin-top: -10px;
}
.dappCard:hover  .appTitle {
  color: rgb(107, 32, 172);
  margin-top: -175px;
}
.dappCard:hover  .appBody {
  display: block;
}
.dappCard:hover  .dappLogo {
  opacity: 0;
}
.dappCard:hover  .categType {
  display: block;
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

