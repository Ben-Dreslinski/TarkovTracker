<template>
    <div>
        <v-container>
            
            <v-text-field
            :value="stats.avg_time"
            label="Average Time"
            filled
            readonly/>

            <v-text-field
            :value="stats.avg_xp"
            label="Average xp"
            filled
            readonly/>

            <v-text-field
            :value="stats.avg_dist"
            label="Averange Distance (km)"
            filled
            readonly/>

            <v-text-field
            :value="stats.avg_acc"
            label="Average Accuracy"
            filled
            readonly/>

            <v-text-field
            :value="stats.avg_scav"
            label="Average Scav Kills"
            filled
            readonly/>
            
        </v-container>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Stats } from '../utility/model';

export default Vue.extend({
  name: 'PlayerStat',
  components: {
    
  },

  props: {
    stats: {
        type: Object as () => Stats,
        required: true
    },
  }
});
</script>