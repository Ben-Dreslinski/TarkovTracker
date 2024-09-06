<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6" lg="4">
        <router-link :to="{ name: 'newraid' }">
          <RouteCard
            image="cokebert.gif"
            title="Enter New Raid"
          />
        </router-link>

        <router-link :to="{ name: 'playerstats' }">
          <RouteCard
            image="cokeglorp.gif"
            title="Player Stats"
          />
        </router-link>

        <router-link :to="{ name: 'dini' }">
          <RouteCard
            image="gambabert.gif"
            title="Dini Playground"
          />
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  import RouteCard from '@/components/RouteCard.vue';

  export default Vue.extend({
    name: 'HomeCards',
    components: {
      RouteCard
    }
  })
</script>
