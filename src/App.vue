<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark>

      <v-btn
        to="/"
        text>
        <span class="mr-2">Home</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  data: () => ({
    //
  }),
});
</script>

<style>
.v-application {
  background-color: #2e2e2e;
}

html, body {
  background-color: #2e2e2e;
}
</style>