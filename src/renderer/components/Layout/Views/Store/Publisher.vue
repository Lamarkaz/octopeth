<template>
  <v-app style="background: #222">
    <div class="mainWrapper">
      <h3 class="text-xs-center MainWrapperTypo">
        <v-icon class="mainWrapperIcon">apps</v-icon>
        Publisher Portal
      </h3>
    </div>
  </v-app>
</template>

<style scoped>
.application--wrap {
  background-color: #222;
}
.mainWrapper {
  min-height: 500px;
  font-family: 'Dosis', sans-serif;
  font-weight: 400;
  font-size: 26px;
  opacity: 0.8;
}
.mainWrapperIcon {
  font-size: 30px !important;
  margin-right: 5px;
  color: white;
  margin-top: -4px;
}
.MainWrapperTypo {
  margin-top: 105px;
  color: white;
  font-size: 20px;
}
</style>