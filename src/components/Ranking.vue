<template>
  <div>
    <v-tabs
      v-model="active"
      color="cyan"
      dark
      slider-color="yellow"
    >
      <v-tab
        :key="Book"
        ripple
      >
        Book

      </v-tab>
      <v-tab
          :key="User"
          ripple
        >
          User

        </v-tab>
      <v-tab-item
        v-for="n in 2"
        :key="n"
      >
        <v-card flat>
         <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>


  </div>
</template>

<script>
export default {
    name: 'RankingTab',
       data () {
            return {
              active: null,
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
            }
          },
    methods:{
    },
    props: {
        msg: String
    }
}
</script>