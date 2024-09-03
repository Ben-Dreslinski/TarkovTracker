<template>
    <div>
      <v-container>
        <div v-if="stats">

          <div :style="getTextFieldStyle('raid_count')">
            <v-text-field
              :value="stats.raid_count"
              label="Raid Count"
              prepend-inner-icon="mdi-exit-run"
              filled
              readonly
            />
          </div>

          <div :style="getTextFieldStyle('avg_time')">
            <v-text-field
              :value="stats.avg_time"
              label="Average Time"
              prepend-inner-icon="mdi-clock-outline"
              filled
              readonly
            />
          </div>
  
          <div :style="getTextFieldStyle('avg_xp')">
            <v-text-field
              :value="stats.avg_xp"
              label="Average XP"
              prepend-inner-icon="mdi-chevron-up-circle-outline"
              filled
              readonly
            />
          </div>

          <div :style="getTextFieldStyle('avg_healed')">
            <v-text-field
              :value="stats.avg_healed"
              label="Average Healed"
              prepend-inner-icon="mdi-needle"
              filled
              readonly
            />
          </div>
  
          <div :style="getTextFieldStyle('avg_dist')">
            <v-text-field
              :value="stats.avg_dist"
              label="Average Distance (km)"
              prepend-inner-icon="mdi-run"
              filled
              readonly
            />
          </div>
  
          <div :style="getTextFieldStyle('avg_acc')">
            <v-text-field
              :value="stats.avg_acc"
              label="Average Accuracy"
              prepend-inner-icon="mdi-crosshairs"
              filled
              readonly
            />
          </div>
  
          <div :style="getTextFieldStyle('avg_scav')">
            <v-text-field
              :value="stats.avg_scav"
              label="Average Scav Kills"
              prepend-inner-icon="mdi-skull-scan-outline"
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
        if (this.stats && this.maxValues) {
          const value = this.stats[statName as keyof Stats];
          const max = this.maxValues[statName as keyof Stats];
  
          let color = '#FFFFFF';
          let borderColor = '#FFFFFF';
  
          let numValue;
          let numMax;

          if (typeof value === 'string') {
            numValue = parseFloat(value);
            numMax = parseFloat(max as string);
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
  