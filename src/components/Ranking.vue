<template>
  <div>
    <v-tabs
      v-model="active"
      color="cyan"
      dark
      slider-color="yellow"

    >
      <v-tab
        :key="Genre"
        v-on:click="getGenreRank()"
      >
        Genre

      </v-tab>
      <v-tab
          :key="Book"
          ripple
          >
          Book

        </v-tab>
        <v-tab-item
        :key="Genre"
        >
            <v-data-table
            :headers="headerGenre"
            :items="datas"
            :items-per-page="10"
            class="elevation-1"
            ></v-data-table>
        </v-tab-item>
        <v-tab-item
        :key="Book"
        >
            <v-row>
                <v-col cols="5">
                    <v-select
                    :items="major_list"
                    v-model="majorList"
                    label="Solo field"
                    solo
                    ></v-select>
                </v-col>
                <v-col cols="5">
                    <v-select
                    :items="minor_list"
                    v-model="minorList"
                    v-on:click="getMinorList()"
                    label="Solo field"
                    solo
                    ></v-select>
                </v-col>
                <v-col cols="2">
                    <v-btn
                    depressed
                    v-on:click="getBookRank()"
                    color="primary"
                    >
                    Search
                    </v-btn>
                </v-col>
            </v-row>
            <v-data-table
            :headers="headerBook"
            :items="bookdatas"
            :items-per-page="10"
            class="elevation-1"
            ></v-data-table>
        </v-tab-item>
    </v-tabs>


  </div>
</template>

<script>
import {first_class, second_class} from "./config.js"
export default {
    name: 'RankingTab',


         data () {
            var genre = [
                         {
                           text: 'Genre list',
                           align: 'start',
                           sortable: false,
                           value: 'name',
                         },
                         { text: 'major', value: 'big' },
                         { text: 'minor', value: 'small' },
                         { text: '대출 횟수', value: 'loanNum' },
                      ];
             var book = [
                        {
                          text: 'Book list',
                          align: 'start',
                          sortable: false,
                          value: 'name',
                        },
                        { text: 'title', value: 'name' },
                        { text: '대출 횟수', value: 'loanNum' },
                      ];

             return {
                  row: null,
                  isBook:false,
                   headerGenre: genre,
                   headerBook: book,
                   header : genre,
                   feats:['Author','Title', 'Year'],
                   datas: [],
                   bookdatas:[],
                   major_list : first_class,
                   minor_list : [],
                   majorList:"",
                   minorList:""
          }
         },
         mounted(){
          this.getGenreRank();
         },
 methods:{


            getGenreRank(){
                    this.$axios
                         .get("./ranking/genre").then((res)=>{
                         console.log(res.data);
                         this.datas = res.data;
                         for (let data of this.datas){
                             data['small'] = second_class[Number(data.major)][Number(data.minor)];
                             data['big'] = first_class[Number(data.major)];
                        }
                        this.header = this.headerGenre;
                        this.isBook = false
                   })
            },
            getBookRank(){
                    this.$axios
                         .get("./ranking/genre/"+String(this.major_list.indexOf(this.majorList))+"/"+String(this.minor_list.indexOf(this.minorList))).then((res)=>{
                         console.log(res.data);
                         this.bookdatas = res.data;


                         this.header = this.headerBook;
                         this.isBook = true;
                   })
            },
            getMinorList(){
                this.minor_list = second_class[first_class.indexOf(this.majorList)]
            }
        },
    props: {
        buf: String
    }
}
</script>