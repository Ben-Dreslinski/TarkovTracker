<template>
    <v-hover v-slot:default="{ isHovering }">
      <v-card
        :elevation="isHovering ? 400 : 4"
        class="home-card"
      >
        <v-img
          :src="require(`@/assets/${image}`)"
          height="200px"
          alt="Home Card Image"
        >
          <v-card-title class="home-card-title">{{ title }}</v-card-title>
        </v-img>
      </v-card>
    </v-hover>
  </template>
  
  <script lang="ts">
  import Vue from 'vue';
  
  export default Vue.extend({
    name: 'RouteCard',
    props: {
      image: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
    },
  });
  </script>
  
  <style scoped>
  .home-card {
    transition: box-shadow 0.3s ease-in-out;
    cursor: pointer;
  }
  
  .home-card-title {
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    width: 100%;
    text-align: center;
  }
  </style>