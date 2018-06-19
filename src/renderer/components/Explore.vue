<template>
  <div class="mainWrapper">
    <h3 class="text-xs-center MainWrapperTypo">
      <v-icon class="mainWrapperIcon">explore</v-icon>
      Explore
    </h3>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex
          v-for="i
          in myDapps"
          :key="`2${i.title}`"
          xs12
          md6
          lg3
          class="appView"
        >
          <v-card class="dappCard" style="height: 250px; width: 250px; padding: 15px">
            <v-card-media :src="i.logo" height="150px" class="dappLogo">
            </v-card-media>
            <v-card-title primary-title >
              <v-card-text>
                <h3 class="appTitle text-xs-center">{{ i.title }}</h3>
                <div class="categType">
                  <v-card-text class="text-xs-center categText">
                    <v-icon style="color: white; margin-right: 2px; margin-top: -5px"></v-icon> GAMING
                  </v-card-text>
                </div>
                <div class="appBody text-xs-center">Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
              </v-card-text>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
