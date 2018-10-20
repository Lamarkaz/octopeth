<template>
  <div class="">
    <div id="electron-titlebar"></div>
    <!-- navigation drawer -->
    <NavDrawer></NavDrawer>
    <!-- navbar -->
    <Navbar></Navbar>

    <!-- installed view -->
    <MyDapps v-show="this.$store.state.view.currView == 'inventory'"></MyDapps>
    <!-- explore view -->
    <Explore v-show="this.$store.state.view.currView == 'explore'"></Explore>
    <!-- publisher portal --> 
    <Publisher v-show="this.$store.state.view.currView == 'publisher'"></Publisher>
  </div>
</template>


<script>
import NavDrawer from '@/components/Layout/Views/Store/Elements/NavDrawer.vue'
export default {
  data () {
    return {
      bottomNav: 3
    }
  },
  components: {
    'NavDrawer': NavDrawer
  }
}
</script>

<style scoped>
.storeNav {
  max-width: 260px; 
}
</style>
