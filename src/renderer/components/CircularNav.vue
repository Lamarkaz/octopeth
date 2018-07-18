<template>
  <div class="navWrapper">
    <circle-menu type="middle-around" :number="4" mask='black' btn colors="[ '#6b20ac', '#A7425C', '#FFE26F', 'F3825F', '#F19584' ]" circle>
      <a slot="item_1" class="navSlot">
        <v-icon slot="item_1" class="navIcon">home</v-icon>
      </a>
      <a slot="item_2" class="navSlot">
        <v-icon slot="item_2" class="navIcon">close</v-icon>
      </a>
      <a slot="item_3" class="navSlot">
        <v-icon slot="item_3" class="navIcon">refresh</v-icon>
      </a>
      <a slot="item_4" class="navSlot">
        <v-icon slot="item_4" class="navIcon">unfold_less</v-icon>
      </a>
    </circle-menu>
  </div>
</template>

<script>
import CircleMenu from 'vue-circle-menu'
export default {
  components: {
    CircleMenu
  }
}
</script>


<style scoped>
.navWrapper {
    position: fixed;
    bottom: 0px;  /* position the top  edge of the element at the middle of the parent */
    left: 50%; /* position the left edge of the element at the middle of the parent */
}
.navSlot {
  cursor: pointer;
}
.navIcon {
  font-size: 27px;
  color: rgba(0,0,0,0.7);
  margin-top: -5px;
}
</style>
