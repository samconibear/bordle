<template>
  <div>
    <div 
      class=
      "
      rounded border-2 
      border-black 
      border-solid 

      "
    >
      <img
        @mouseover="hoverCssFilter  = 'filter-hover';"
        @mouseleave="hoverCssFilter = '';"
        @click="onClickCountry(country)"
        :src="getSvg(country)"
        alt="don't try to cheat!"
        class="inline-block p-2 md:p-4"
        :class="[country.cssFilter, hoverCssFilter]"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Country",
  data: function() {
    return {
      hoverCssFilter: '',
    }
  },
  props: [
    'country',
    'countryToGuess',
  ],
  methods: {
    getSvg: function(country) {
      return require(`/public/svg/countries/${country.code.toLowerCase()}/vector.svg`);
    },
    onClickCountry: function (chosenCountry) {
      if (chosenCountry === this.countryToGuess) {
        chosenCountry.cssFilter = "filter-correct";
      } else {
        chosenCountry.cssFilter = "filter-incorrect";
      }
      this.$forceUpdate();
    },
  },
};
</script>

<style>
.filter-hover {
  filter: invert(33%) sepia(0%) saturate(0%) hue-rotate(242deg) brightness(86%) contrast(91%);
}
.filter-incorrect {
  filter: invert(8%) sepia(87%) saturate(4910%) hue-rotate(360deg) brightness(100%) contrast(112%);
}
.filter-correct {
  filter: invert(51%) sepia(31%) saturate(1218%) hue-rotate(56deg) brightness(112%) contrast(89%);
}
</style>
