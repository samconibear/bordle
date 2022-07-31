<template>
  <div id="app">
    <Header/>
    <div id="game" class="max-w-max mx-auto">
      <GuessWord
        :country="countryToGuess"
        class="py-1 md:py-5"
      />
      <div class="
      grid mx-auto justify-items-center gap-4 max-w-max
      grid-cols-2
      md:grid-cols-4 
      ">
      
        <span 
          v-for="country in sortedCountriesChoices" 
          :key="country.code"
          class="
          w-32
          md:w-60"
        >
          <Country
            :countryToGuess="countryToGuess"
            :country="country"
          />
        </span>
      </div>
    </div>


  </div>
</template>

<script>
import * as daily from "@/js/daily.js";
import Country from './components/Country.vue';
import Header from './components/Header.vue';
import GuessWord from './components/GuessWord.vue';

export default {
  name: "App",
  components: {
    Country,
    Header,
    GuessWord,
  },
  data: function() {
    return {
      countryToGuess: null,
      countriesChoices: null,
    }
  },
  computed: {
    sortedCountriesChoices: function () {
      return this.countriesChoices.slice(); // copy
    }
  },
  methods: {
    onClickCountry: function (chosenCountry) {
      if (chosenCountry === this.countryToGuess) {
        chosenCountry.cssFilter = "filter-correct";
        console.log(chosenCountry.cssFilter)
      } else {
        chosenCountry.cssFilter = "filter-incorrect";
        console.log(chosenCountry.cssFilter)
      }
    },
  },
  mounted: function() {
    console.log('mounted')
    this.countryToGuess   = daily.todaysCountry();
    this.countriesChoices = daily.todaysChoices();
  },
};
</script>

<style>
.h {
  font-family: 'Clear Sans', 'Helvetica Neue', Arial, sans-serif;
}
</style>
