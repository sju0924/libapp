<template>
  <v-container
    id="input-usage"
    fluid
  >
    <v-row>
      <v-col cols="10">
        <v-select
                  :items="items"
                  v-model="year"
                  label="Solo field"
                  solo
                ></v-select>
      </v-col>
      <v-col cols="2">
       <v-btn
            depressed
            color="primary"
            v-on:click="searchByYear()"
          >
            Search
          </v-btn>
      </v-col>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="desserts"
          :items-per-page="10"
          class="elevation-1"
        ></v-data-table>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import {first_class, second_class} from "./config.js"
export default {
    name: 'NewTab',

     data () {

          var i = 0;
          var item = [];
          for(i = 2022; i>=1900; i--){
            item.push(i);
          }
          return {
           row: null,
           selectedFeat: 'author',
           searchBar:'',
            headers: [
              {
                text: 'Book list',
                align: 'start',
                sortable: false,
                value: 'name',
              },
              { text: 'title', value: 'title' },
              { text: 'author', value: 'author' },
              { text: 'year', value: 'year' },
              { text: '대분류', value: 'major' },
              { text: '소분류', value: 'minor' },
              { text: 'publisher', value: 'publisher' },
            ],
            SearchFeat: ['author','title', 'publisher'],
            feats:['author','title', 'year', 'major', 'minor', 'publisher'],
            desserts: [],
            items: item,
            year: 2022
        }
    },
    methods:{
        selectFeat (param) {
             this.selectedFeat = param;
        },

        searchByYear(){
            this.$axios
                  .get("./new/"+this.year).then((res)=>{
                  console.log(res.data);
                  this.desserts = res.data;

                  let major_num;
                  let minor_num;
                  for (let data of this.desserts){
                        major_num = Number(data['major']);
                        minor_num = Number(data['minor']);
                       data['major'] = first_class[major_num]; //for debug
                       data['minor'] = second_class[major_num][minor_num];

                   }
              })
        },

    },
    computed: {
          getFeat () {
             return this.selectedFeat;
          }
        },

    props: {
        msg: String
    },
}
</script>