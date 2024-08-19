<template>
    <div>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation>

        <v-container>
          <v-row justify="center">
            <v-col cols="12" md="8" lg="6">

              <v-autocomplete
                v-model="selectedName"
                label="Player"
                filled
                required
                clearable
                :rules="[v => !!(v && v.length) || 'Item is required']"
                :items="playerNames"/>

              <v-autocomplete
                v-model="selectedMap"
                label="Map"
                filled
                required
                clearable
                :rules="[v => !!(v && v.length) || 'Item is required']"
                :items="maps"/>

              <v-switch
                v-model="survived">
                <template v-slot:label>
                  <v-row>
                    <v-img
                      :src="require(`@/assets/${survivedImage}`)"
                      alt="Survived Icon"
                      class="icon-image mr-2"/>
                  </v-row>
                </template>
              </v-switch>

              <v-text-field v-if="!survived"
                label="Killer"
                filled
                clearable
                v-model="killer"
                :rules="stringRules"/>

              <v-autocomplete v-if="!survived"
                label="Death Limb"
                filled
                required
                clearable
                v-model="selectedLimb"
                :rules="[v => !!(v && v.length) || 'Item is required']"
                :items="deathLimbs"/>

              <v-text-field
                v-model="time"
                label="Time"
                filled
                required
                clearable
                :rules="timeRules"/>

              <v-text-field
                label="Experience"
                filled
                required
                clearable
                v-model="xp"
                :rules="numberRules"/>

              <transition name="expand-fade" mode="out-in">
                <v-card class="pa-2 mb-4" outlined>
                  <v-card-title>
                    <v-row class="d-flex align-center justify-space-between">
                      <v-btn @click="removeKill" icon color="red" :disabled="pmcKills.length === 0">
                        <v-icon>mdi-minus</v-icon>
                      </v-btn>

                      <span class="headline">Kills</span>

                      <v-btn @click="addKill" icon color="blue">
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                    </v-row>
                  </v-card-title>

                  <v-divider></v-divider>

                  <v-card-subtitle>
                    Add/remove kills as needed.
                  </v-card-subtitle>

                  <v-card-text style="max-height: 400px; overflow-y: auto;">
                    <transition-group name="fade" tag="div">
                      <v-row v-for="(pmcKill, index) in pmcKills" :key="index" dense>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="pmcKills[index]"
                            label="Player Name"
                            filled
                            dense
                            required/>
                        </v-col>
                      </v-row>
                    </transition-group>
                  </v-card-text>
                </v-card>
              </transition>

              <v-text-field
                label="Scav Kills"
                filled
                required
                clearable
                v-model="scavKills"
                :rules="numberRules"/>

              <v-text-field
                label="Amount Healed"
                filled
                required
                clearable
                v-model="amountHealed"
                :rules="numberRules"/>

              <v-text-field
                label="Distance traveled"
                filled
                required
                clearable
                v-model="kmTraveled"
                :rules="numberRules"/>

              <v-text-field
                label="Accuracy"
                filled
                required
                clearable
                v-model="accuracy"
                :rules="accuracyRules"/>

              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="validate">Validate</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>

      <v-dialog v-model="dialogSuccess" max-width="500" persistent>
        <v-card>
          <v-card-title class="headline text-center">
            Raid successfully created!
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="handleClose">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogFailure" max-width="500" persistent>
        <v-card>
          <v-card-title class="headline text-center">
            Failed to create raid - please tell ben.
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="handleClose">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import VForm from 'vuetify/lib';
import BaseApi from '@/utility/base-api';
import { Player } from '@/utility/model';

export default Vue.extend({
  name: 'NewRaidView',
  components: {
    
  },

  data: function ()
  {
    return {
      valid: true,
      dialogSuccess: false,
      dialogFailure: false,
      selectedName: "" as string,
      players: [] as Player[],
      maps: ['Factory', 'Woods', 'Customs', 'Interchange', 'Reserve', 'Shoreline',
              'Labs', 'Lighthouse', 'Streets', 'Ground Zero'],
      selectedMap: "" as string,
      survived: true as boolean,
      time: "" as string,
      xp: null as number | null,
      pmcKills: [] as string[],
      amountHealed: null as number | null,
      kmTraveled: null as number | null,
      accuracy: null as number | null,
      scavKills: null as number | null,
      killer: "" as string || null,
      deathLimbs: ['Top of head', 'Head eyes', 'Head jaws', 'Head ears', 'Head face',
                  'Head throat', 'Nape', 'Thorax', 'Right arm', 'Left arm', 'Stomach',
                  'Right leg', 'Left leg'
      ],
      selectedLimb: "" as string || null,
      autocompleteRules: [
        value => !!value || 'Required.',
        value => {
          return v => !!(v && v.length) || 'Item is required';
        }
      ],
      timeRules: [
        value => !!value || 'Required.',
        value => {
          const pattern = /^\d{1,2}:[0-5]\d$/
          return pattern.test(value) || 'Invalid Timestamp.'
        }
      ],
      numberRules: [
        value => !!value || 'Required.',
        value => {
          const pattern = /^\d+(\.\d{1,2})?$/
          return pattern.test(value) || 'Must be a valid number.'
        }
      ],
      accuracyRules: [
        value => !!value || 'Required.',
        value => {
          const pattern = /^(0(\.[0-9]+)?|1(\.0*)?)$/;
          return pattern.test(value) || 'Accuracy is between 0 and 1.'
        }
      ],
      stringRules: [
      value => !!value || 'Required.',
      value => typeof value === 'string' || 'Must be a string.'
      ]
    }
  },

  computed: {
    playerNames: function (): string[]
    {
      return this.players.map(player =>
      {
        return player.name;
      })
    },

    survivedImage: function ()
    {
      if (this.survived) {
        return 'survived.png';
      }
      else {
        return 'kia.png';
      }
    }
  },

  watch:
  {
    survived: function(val)
    {
      if (val) {
        this.killer = null;
        this.selectedLimb = null;
      }
    }
  },

  created: async function ()
  {
    const response = await BaseApi.get<Player[]>('/get_players');
    this.players = response.data;
  },

  methods:
  {
    addKill: function ()
    {
      this.pmcKills.push('');
    },

    removeKill: function ()
    {
      if (this.pmcKills.length >= 1) {
        this.pmcKills.pop();
      }
    },

    validate: function ()
    {
      if (!(this.$refs.form as any).validate()) {
        return;
      }

      this.createRaid();
    },

    createRaid: async function()
    {
      const data = {
        player_id: this.getPlayerIdByname(this.selectedName),
        level: this.selectedMap,
        survived: this.survived,
        time: this.time,
        experience: this.xp,
        kills: this.pmcKills,
        amount_healed: this.amountHealed,
        distance_traveled: this.kmTraveled,
        accuracy: this.accuracy,
        scav_kills: this.scavKills,
        killer: this.killer,
        death_limb: this.selectedLimb
      };

      try {
        const response = await BaseApi.post('/create_raid', data);
        console.log(`create_raid response: ${JSON.stringify(response.data)}`);

        this.dialogSuccess = true;
      } catch (error) {
        this.dialogFailure = true;
      }
    },

    getPlayerIdByname(name: string): number | undefined
    {
      const player = this.players.find(player => player.name === name);
      return player?.id;
    },

    handleClose: function ()
    {
      this.$router.push('/');
    }
  }
});
</script>

<style scoped>
.v-card-title {
  border-bottom: 1px solid #e0e0e0; /* Divider line */
}

.v-card-subtitle {
  color: #616161; /* Subtitle color */
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* Transition for smooth card resizing */
.expand-fade-enter-active, .expand-fade-leave-active {
  transition: all 0.5s ease;
}

.expand-fade-enter, .expand-fade-leave-to {
  opacity: 0;
  transform: scaleY(0.95); /* Slight scale for a smoother effect */
}

.icon-image {
  max-width: 150px;
  margin-left: 15px;
}
</style>