<template>
    <div>
      <v-container>
        <div v-if="stats">
          <div :style="getTextFieldStyle('avg_time')">
            <v-text-field
              :value="stats.avg_time"
              label="Average Time"
              filled
              readonly
            />
          </div>
  
          <div :style="getTextFieldStyle('avg_xp')">
            <v-text-field
              :value="stats.avg_xp"
              label="Average XP"
              filled
              readonly
            />
          </div>
  
          <div :style="getTextFieldStyle('avg_dist')">
            <v-text-field
              :value="stats.avg_dist"
              label="Average Distance (km)"
              filled
              readonly
            />
          </div>
  
          <div :style="getTextFieldStyle('avg_acc')">
            <v-text-field
              :value="stats.avg_acc"
              label="Average Accuracy"
              filled
              readonly
            />
          </div>
  
          <div :style="getTextFieldStyle('avg_scav')">
            <v-text-field
              :value="stats.avg_scav"
              label="Average Scav Kills"
              filled
              readonly
            />
          </div>
        </div>
      </v-container>
    </div>
  </template>
  
  <script lang="ts">
  import Vue from 'vue';
  import { Stats } from '../utility/model';
  
  export default Vue.extend({
    name: 'PlayerStat',
    props: {
      stats: {
        type: Object as () => Stats,
        required: true
      },
      maxValues: {
        type: Object as () => Stats,
        required: true
      }
    },
    methods: {
      getTextFieldStyle(statName: keyof Stats) {
        console.log(`statName: ${statName}`);
        if (this.stats && this.maxValues) {
          const value = this.stats[statName as keyof Stats];
          const max = this.maxValues[statName as keyof Stats];
  
          let color = '#FFFFFF';
          let borderColor = '#FFFFFF';
  
          let numValue;
          let numMax;
          console.log(`stat: ${value}, type: ${typeof(value)}`);
          if (typeof value === 'string') {
            numValue = parseFloat(value);
            numMax = parseFloat(max as string);
  
            console.log(`Stat Name: ${statName}, Value: ${numValue}, Max: ${numMax}`);
          }
          else
          {
            numValue = value;
            numMax = max;
          }
          
          if (!isNaN(numValue) && !isNaN(numMax)) {
              borderColor = numValue === numMax ? '#00FF00' : '#FF0000';
            }
  
          return {
            border: `1px solid ${borderColor}`,
            padding: '4px',
            borderRadius: '4px',
            'margin-top': '10px'
          };
        }
        return {};
      }
    }
  });
  </script>
  
  <style scoped>
  </style>
  