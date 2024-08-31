<template>
    <div>
      <v-form ref="form" lazy-validation>
        <v-container>
          <v-row>
            <!-- First Dropdown -->
            <v-col cols="6">
              <v-autocomplete
                v-model="firstPlayer"
                label="Player 1"
                filled
                clearable
                :items="players.map(p => p.name)"
              />
            </v-col>
  
            <!-- Second Dropdown -->
            <v-col cols="6">
              <v-autocomplete
                v-model="secondPlayer"
                label="Player 2"
                filled
                clearable
                :items="players.map(p => p.name)"
              />
            </v-col>
          </v-row>
  
          <v-row>
            <!-- First PlayerStat Component Wrapped in v-card -->
            <v-col cols="6">
              <v-card v-if="firstPlayer" :key="firstPlayer">
                <v-card-title class="headline">{{ firstPlayer }}'s Stats</v-card-title>
                <v-card-text>
                  <PlayerStat
                    :stats="firstStats"
                    :maxValues="maxValuesForFirstPlayer"
                  />
                </v-card-text>
              </v-card>
            </v-col>
  
            <!-- Second PlayerStat Component Wrapped in v-card -->
            <v-col cols="6">
              <v-card v-if="secondPlayer" :key="secondPlayer">
                <v-card-title class="headline">{{ secondPlayer }}'s Stats</v-card-title>
                <v-card-text>
                  <PlayerStat
                    :stats="secondStats"
                    :maxValues="maxValuesForSecondPlayer"
                  />
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </div>
  </template>
  
  <script lang="ts">
  import Vue from 'vue';
  import BaseApi from '../utility/base-api';
  import { Player, Stats } from '../utility/model';
  import PlayerStat from '../components/PlayerStat.vue';
  
  export default Vue.extend({
    name: 'PlayerStats',
    components: {
      PlayerStat
    },
    data: function () {
      return {
        players: [] as Player[],
        firstPlayer: null as Player | null,
        secondPlayer: null as Player | null,
        firstStats: null as Stats | null,
        secondStats: null as Stats | null,
        maxValuesForFirstPlayer: {} as Stats,
        maxValuesForSecondPlayer: {} as Stats
      }
    },
    watch: {
      firstPlayer: async function (val: string) {
        const id = this.players.find(p => p.name === val)?.id;
        const res = await BaseApi.get<Stats>(`/get_player_stats/${id}`);
        this.firstStats = res.data[0];
        this.updateMaxValues();
        console.log(`res => ${JSON.stringify(this.firstStats, null, 2)}`);
      },
      secondPlayer: async function (val: string) {
        const id = this.players.find(p => p.name === val)?.id;
        const res = await BaseApi.get<Stats>(`/get_player_stats/${id}`);
        this.secondStats = res.data[0];
        this.updateMaxValues();
        console.log(`res => ${JSON.stringify(this.secondStats, null, 2)}`);
      }
    },
    methods: {
      async updateMaxValues() {
        if (this.firstStats && this.secondStats) {
          this.maxValuesForFirstPlayer = this.calculateMaxValues(this.firstStats, this.secondStats);
          this.maxValuesForSecondPlayer = this.calculateMaxValues(this.secondStats, this.firstStats);
        }
      },
      calculateMaxValues(stats1: Stats, stats2: Stats): Stats {
        // Convert avg_time to number for comparison
        const avgTime1 = parseFloat(stats1.avg_time) || 0;
        const avgTime2 = parseFloat(stats2.avg_time) || 0;
        const maxAvgTime = Math.max(avgTime1, avgTime2);
  
        return {
            id: -1,
          avg_time: maxAvgTime.toString(), // Convert back to string for display
          avg_xp: Math.max(stats1.avg_xp, stats2.avg_xp),
          avg_healed: Math.max(stats1.avg_healed, stats2.avg_healed),
          avg_dist: Math.max(stats1.avg_dist, stats2.avg_dist),
          avg_acc: Math.max(stats1.avg_acc, stats2.avg_acc),
          avg_scav: Math.max(stats1.avg_scav, stats2.avg_scav)
        };
      }
    },
    created: async function () {
      const response = await BaseApi.get<Player[]>('/get_players');
      this.players = response.data;
    }
  });
  </script>
  
  <style scoped>
  </style>
  