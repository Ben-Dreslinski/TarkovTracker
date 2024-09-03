<template>
  <home-cards />
</template>

<script lang="ts">
  import Vue from 'vue'
  import HomeCards from '../components/HomeCards.vue'

  export default Vue.extend({
    name: 'HomeView',

    components: {
      HomeCards,
    },
  })
</script>

<style>

html {
  background-color: grey;
}

</style>
