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
                  :key="firstStats"
                  :stats="firstStats" />
                </v-card-text>
              </v-card>
            </v-col>
  
            <!-- Second PlayerStat Component Wrapped in v-card -->
            <v-col cols="6">
              <v-card v-if="secondPlayer" :key="secondPlayer">
                <v-card-title class="headline">{{ secondPlayer }}'s Stats</v-card-title>
                <v-card-text>
                  <PlayerStat
                  :key="secondStats"
                  :stats="secondStats" />
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
import VForm from 'vuetify/lib';
import BaseApi from '../utility/base-api';
import { Player } from '../utility/model';
import { Stats } from '../utility/model';
import PlayerStat from '../components/PlayerStat.vue';

export default Vue.extend({
  name: 'PlayerStats',
  components: {
    PlayerStat
  },

  data: function ()
  {
    return {
      players: [] as Player[],
      firstPlayer: null as Player | null,
      secondPlayer: null as Player | null,
      firstStats: null as Stats | null,
      secondStats: null as Stats | null
    }
  },

  watch: {
    firstPlayer: async function (val: string)
    {
        const id = this.players.find(p => p.name === val)?.id;
        const res = await BaseApi.get<Stats>(`/get_player_stats/${id}`);
        this.firstStats = res.data[0];
        console.log(`res => ${JSON.stringify(this.firstStats, null, 2)}`);
    },

    secondPlayer: async function (val: string)
    {
        const id = this.players.find(p => p.name === val)?.id;
        const res = await BaseApi.get<Stats>(`/get_player_stats/${id}`);
        this.secondStats = res.data[0];
        console.log(`res => ${JSON.stringify(this.secondStats, null, 2)}`);
    }
  },

  created: async function ()
  {
    const response = await BaseApi.get<Player[]>('/get_players');
    this.players = response.data;
  }
});
</script>

<style scoped>
</style>