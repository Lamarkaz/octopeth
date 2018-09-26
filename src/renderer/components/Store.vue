<template>
  <div class="">
    <div id="electron-titlebar"></div>
    <!-- navigation drawer -->
    <NavDrawer></NavDrawer>
    <!-- navbar -->
    <Navbar></Navbar>

    <!-- installed view -->
    <MyDapps v-show="this.$store.state.dapps.currView == 'inventory'"></MyDapps>
    <!-- explore view -->
    <Explore v-show="this.$store.state.dapps.currView == 'explore'"></Explore>
    <!-- publisher portal --> 
    <Publisher v-show="this.$store.state.dapps.currView == 'publisher'"></Publisher>
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
        case 1: return 'purple darken-3'
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
