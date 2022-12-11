<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-avatar
        :color="$vuetify.breakpoint.smAndDown ? 'grey darken-1' : 'transparent'"
        size="32"
      ></v-avatar>

      <v-tabs
        centered
        class="ml-n9"
        color="grey darken-1">
        <v-tab
          v-for="link in links"
          :key="link"
          v-on:click="movePage(link)"
          >
          {{ link }}
        </v-tab>
      </v-tabs>

      <v-avatar
        class="hidden-sm-and-down"
        color="grey darken-1 shrink"
        size="32"
      ></v-avatar>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>

          <v-col
            cols="12"
            sm="12"
          >
            <v-sheet
               class="lighten -3 pa-10"
              min-height="70vh"
              rounded="lg">
                <component v-bind:is="getTab"></component>
            </v-sheet>
          </v-col>

        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
/* eslint-disable */
import SearchTab from "./Search.vue";
import InventoryTab from "./Inventory.vue"
import RankingTab from "./Ranking.vue"
import RecommendationTab from "./Recommendation.vue"
import SeriesTab from "./Series.vue"

export default {
    name: 'SearchPage',
     data: () => ({
          currentTab : "Search",
          links: [
            'Search',
            'Inventory',
            'Ranking',
            'Recommendation',
            'Series'
          ],
        }),
    components:{
        SearchTab,
        InventoryTab,
        RankingTab,
        RecommendationTab,
        SeriesTab
    },
    methods:{
        movePage(param){
            this.currentTab = param;
            console.log(this.currentTab)
        }
    },
    computed: {
      getTab () {
         console.log(this.currentTab+'tab')
         return this.currentTab+'Tab'
      }
    },
    props: {
        msg: String
    }
}
</script>