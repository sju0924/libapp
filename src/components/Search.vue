<template>
  <v-container
    id="input-usage"
    fluid
  >
    <v-row>
      <v-col cols="12">
        <v-radio-group row>
              <v-radio
                v-for="n in SearchFeat"
                :key="`${n}`"
                :label="`${n}`"
                :value="`${n}`"
                v-on:click="selectFeat(`${n}`)"
              ></v-radio>
            </v-radio-group>
      </v-col>
      <v-col cols="10">
         <v-text-field
                    v-model="searchBar"
                    solo
                    :label="getFeat"
                    clearable
                  >
                  </v-text-field>

      </v-col>
      <v-col cols="2">
       <v-btn
            depressed
            color="primary"
            v-on:click="searchByAttribute()"
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
          @click:row=showRowInfo
        ></v-data-table>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import {first_class, second_class} from "./config.js"
export default {
    name: 'SearchTab',

     data () {


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
              { text: 'index', value: 'idx' },
              { text: 'title', value: 'title' },
              { text: 'author', value: 'author' },
              { text: 'year', value: 'year' },
              { text: '대분류', value: 'major' },
              { text: '소분류', value: 'minor' },
              { text: 'publisher', value: 'publisher' },
            ],
            SearchFeat: ['author','title', 'publisher'],
            feats:['index','author','title', 'year', 'major', 'minor', 'publisher'],
            desserts: []
        }
    },
    methods:{
        selectFeat (param) {
             this.selectedFeat = param;
        },

        searchByAttribute(){
            this.$axios
                  .get("./attribute/"+this.selectedFeat+"/"+this.searchBar).then((res)=>{
                  console.log(res.data);
                  this.desserts = res.data;

                  let major_num;
                  let minor_num;
                  let i = 0;
                  for (let data of this.desserts){
                        major_num = Number(data['major']);
                        minor_num = Number(data['minor']);
                       data['idx'] = ++i;
                       data['major'] = first_class[major_num]; //for debug
                       data['minor'] = second_class[major_num][minor_num];

                   }
              })
        },

        showRowInfo (event, { item } ) {
                      console.log(this.desserts[item['idx']-1]['title']);
                      this.$emit('searchBookTitle',this.desserts[item['idx']-1]['title'])
                  }

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