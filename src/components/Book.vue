<template>
  <v-container
    id="input-usage"
    fluid
  >
    <v-row>
      <v-col cols="10" style="z-index:3">
      <div style="z-index:4">
         <v-text-field
                    v-model="searchBar"
                    solo
                    label="title"
                    clearable
                  >
                  </v-text-field>
                  </div>

      </v-col>
      <v-col cols="2" style="z-index:4">
      <div style="z-index:3">
       <v-btn
            depressed
            class = "ml = 2"
            color="primary"
            v-on:click="searchDetail()"
          >
            Search
          </v-btn>
          </div>
      </v-col>

       <v-col style="z-index:4">
              <v-data-table
                :headers="headers"
                :items="books"
                :items-per-page="10"
                class="elevation-1"
                @click:row=showRowInfo
              ></v-data-table>
            </v-col>
             <v-col cols="12" style="z-index:2">
                    <div style="    height: 100px;
                                    width: 90%;
                                    background-color: white;
                                    top: -80px;
                                    position: relative;"></div>
                  </v-col>
      <v-col cols="12" style="z-index:1; width:90%">
            <div style="position:relative; top:-200px;z-index:1; margin-left:20%;">
              <iframe
                  :src="detailPage"

                  width="750px"
                  height="2000px"
                  frameborder="0" >
                 </iframe>
            </div>
         </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
    name: 'BookTab',
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
              { text: 'index', value: 'idx' },
              { text: 'title', value: 'originalTitle' },
              { text: 'author', value: 'originalAuthor' },
              { text: 'publisher', value: 'originalPublisher' },
              { text: 'ISBN', value: 'isbn' },
              { text: 'library', value: 'libName' },
              { text: '대출 여부', value: 'loanStatus'}
            ],
            feats:['index', 'title', 'author',  'publisher', 'isbn', 'library', '대출 여부'],
            books: [],
            searchBar: "",
            detailPage: "./test"
       }
      },
    methods:{
        searchDetail(){
            console.log(this.searchBar);
            this.$axios
                  .get("./detail/" +this.searchBar).then((res)=>{
                  console.log(res.data);
                  this.books = res.data;

                    var i = 0;
                  for (let data of this.books){
                        data['idx'] = ++i;
                       data['url'] = 'https://www.suwonlib.go.kr:8443/singleBook/'+data['bookKey']+'/'+data['speciesKey']+'/'+data['ISBN'];
                   }

                });



            },


        showRowInfo (event, { item } ) {
              console.log(this.books[item['idx']]['url']);
              this.detailPage = this.books[item['idx']]['url'];
            }
        },

        mounted(){
            console.log("Buf of Book, ",this.buf);
            if(this.buf != ""){
            this.$axios
                  .get("./detail/" +this.buf).then((res)=>{
                  console.log(res.data);
                  this.books = res.data;

                    var i = 0;
                  for (let data of this.books){
                        data['idx'] = ++i;
                       data['url'] = 'https://www.suwonlib.go.kr:8443/singleBook/'+data['bookKey']+'/'+data['speciesKey']+'/'+data['ISBN'];
                   }


                   this.$emit('searchBookTitle',"")


                });
            }
        },


    props: {
        buf: String
    }
}
</script>