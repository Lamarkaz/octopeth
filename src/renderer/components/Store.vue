<template>
  <div class="">
    <div id="electron-titlebar"></div>
    <!-- navbar -->
    <Navbar></Navbar>
    <!-- installed view -->
    <MyDapps></MyDapps>
    <!-- explore view-->
    <Explore></Explore>
    <!-- <Explore></Explore> -->
    <v-card>
      <v-bottom-nav
        :active.sync="bottomNav"
        color="purple darken-3"
        :value="true"
        fixed
        class="storeNav"
      >
        <v-btn dark>
          <span>Explore</span>
          <v-icon>explore</v-icon>
        </v-btn>

        <v-btn dark>
          <span>My ÐApps</span>
          <v-icon>archive</v-icon>
        </v-btn>
      </v-bottom-nav>
    </v-card>
  </div>
</template>


<script>
export default {
  data () {
    return {
      bottomNav: 3
    }
  },
  computed: {
    color () {
      switch (this.bottomNav) {
        case 0: return 'purple darken-3'
        case 1: return 'purple darken-3 '
      }
    }
  }
}
</script>

<style scoped>
.storeNav {
  max-width: 260px; 
  
}
</style>
