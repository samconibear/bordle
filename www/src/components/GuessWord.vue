<template>
  <div>
    <p class="text-3xl font-semibold text-center">
      {{country.name}} 
    </p>
  </div>
</template>

<script>
export default {
  name: "GuessWord",
  data: function() {
    return {
    }
  },
  props: [
    'country',
  ],
  methods: {
  },
  mounted: function() {
  },
};
</script>

<style scoped>
.filter-hover:hover {
  filter: invert(33%) sepia(0%) saturate(0%) hue-rotate(242deg) brightness(86%) contrast(91%);
}
.filter-red {
  filter: invert(8%) sepia(87%) saturate(4910%) hue-rotate(360deg) brightness(100%) contrast(112%);
}
.filter-green {
  filter: invert(51%) sepia(31%) saturate(1218%) hue-rotate(56deg) brightness(112%) contrast(89%);
}
</style>
