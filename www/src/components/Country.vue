<template>
  <div>
    <div
      class="rounded border-2 border-black border-solid"
      :class="animationClass"
      @animationend="animationClass = ''"
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
    <div class="text-center text-sm font-semibold mt-1 h-5 leading-5 truncate">
      {{ selected ? country.name : '' }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Country",
  data: function() {
    return {
      hoverCssFilter: '',
      animationClass: '',
      selected: false,
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
        this.animationClass = 'animate-victory';
      } else {
        chosenCountry.cssFilter = "filter-incorrect";
        this.animationClass = 'animate-shake';
      }
      this.selected = true;
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

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  15%       { transform: translateX(-8px); }
  30%       { transform: translateX(8px); }
  45%       { transform: translateX(-6px); }
  60%       { transform: translateX(6px); }
  75%       { transform: translateX(-3px); }
  90%       { transform: translateX(3px); }
}

@keyframes victory {
  0%   { transform: scale(1); }
  25%  { transform: scale(1.18) rotate(-3deg); }
  50%  { transform: scale(1.12) rotate(3deg); }
  70%  { transform: scale(1.06) rotate(-1deg); }
  85%  { transform: scale(1.02); }
  100% { transform: scale(1); }
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

.animate-victory {
  animation: victory 0.6s ease-in-out;
}
</style>
