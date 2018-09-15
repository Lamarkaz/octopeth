<template>
  <div class="">
    <div id="electron-titlebar"></div>
    <!-- navbar -->
    <Navbar></Navbar>
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
