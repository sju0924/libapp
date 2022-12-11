<template>
  <v-container
    id="input-usage"
    fluid
  >
    <v-row>
      <v-col cols="12">
        <v-radio-group row>
              <v-radio
                v-for="n in feats"
                :key="`${n}`"
                :label="`${n}`"
                :value="`${n}`"
                v-on:click="selectFeat(`${n}`)"
              ></v-radio>
            </v-radio-group>
      </v-col>
      <v-col cols="10">
         <v-text-field
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
export default {
    name: 'SearchTab',
    mounted(){
        const HOST = "http://localhost:8080";
        this.$axios
              .get(HOST + "/test").then((res)=>{
              console.log(res.data);
              this.desserts = res.data;
              })


    },
     data () {


          return {
           row: null,
           selectedFeat: 'Author',
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
              { text: 'ISBN', value: 'isbn' },
            ],
            feats:['Author','Title', 'Year'],
            desserts: []
        }
    },
    methods:{
        selectFeat (param) {
             this.selectedFeat = param;
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