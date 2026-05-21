import { shallowMount } from "@vue/test-utils";
import Country from "@/components/Country.vue";

function makeCountry(code, name) {
  return { code, name, latitude: 0, longitude: 0, cssFilter: "" };
}

function mountCountry(country, countryToGuess) {
  return shallowMount(Country, {
    propsData: { country, countryToGuess },
  });
}

describe("Country.vue", () => {
  describe("initial state", () => {
    it("does not show the country name before a selection is made", () => {
      const country = makeCountry("DE", "Germany");
      const toGuess = makeCountry("FR", "France");
      const wrapper = mountCountry(country, toGuess);
      expect(wrapper.find(".absolute").text()).toBe("");
    });

    it("starts with animationClass as empty string", () => {
      const country = makeCountry("DE", "Germany");
      const toGuess = makeCountry("FR", "France");
      const wrapper = mountCountry(country, toGuess);
      expect(wrapper.vm.animationClass).toBe("");
    });

    it("starts with selected as false", () => {
      const country = makeCountry("DE", "Germany");
      const toGuess = makeCountry("FR", "France");
      const wrapper = mountCountry(country, toGuess);
      expect(wrapper.vm.selected).toBe(false);
    });
  });

  describe("clicking the correct country", () => {
    it("sets cssFilter to filter-correct on the country object", async () => {
      const country = makeCountry("FR", "France");
      const wrapper = mountCountry(country, country); // same reference = correct guess
      await wrapper.find("img").trigger("click");
      expect(country.cssFilter).toBe("filter-correct");
    });

    it("sets animationClass to animate-victory", async () => {
      const country = makeCountry("FR", "France");
      const wrapper = mountCountry(country, country);
      await wrapper.find("img").trigger("click");
      expect(wrapper.vm.animationClass).toBe("animate-victory");
    });

    it("sets selected to true", async () => {
      const country = makeCountry("FR", "France");
      const wrapper = mountCountry(country, country);
      await wrapper.find("img").trigger("click");
      expect(wrapper.vm.selected).toBe(true);
    });

    it("reveals the country name", async () => {
      const country = makeCountry("FR", "France");
      const wrapper = mountCountry(country, country);
      await wrapper.find("img").trigger("click");
      expect(wrapper.find(".absolute").text()).toBe("France");
    });
  });

  describe("clicking the wrong country", () => {
    it("sets cssFilter to filter-incorrect on the country object", async () => {
      const country = makeCountry("DE", "Germany");
      const toGuess = makeCountry("FR", "France");
      const wrapper = mountCountry(country, toGuess);
      await wrapper.find("img").trigger("click");
      expect(country.cssFilter).toBe("filter-incorrect");
    });

    it("sets animationClass to animate-shake", async () => {
      const country = makeCountry("DE", "Germany");
      const toGuess = makeCountry("FR", "France");
      const wrapper = mountCountry(country, toGuess);
      await wrapper.find("img").trigger("click");
      expect(wrapper.vm.animationClass).toBe("animate-shake");
    });

    it("sets selected to true", async () => {
      const country = makeCountry("DE", "Germany");
      const toGuess = makeCountry("FR", "France");
      const wrapper = mountCountry(country, toGuess);
      await wrapper.find("img").trigger("click");
      expect(wrapper.vm.selected).toBe(true);
    });

    it("reveals the country name", async () => {
      const country = makeCountry("DE", "Germany");
      const toGuess = makeCountry("FR", "France");
      const wrapper = mountCountry(country, toGuess);
      await wrapper.find("img").trigger("click");
      expect(wrapper.find(".absolute").text()).toBe("Germany");
    });
  });

  describe("animationend event", () => {
    it("clears animationClass when the animation ends", async () => {
      const country = makeCountry("DE", "Germany");
      const toGuess = makeCountry("FR", "France");
      const wrapper = mountCountry(country, toGuess);
      await wrapper.find("img").trigger("click");
      expect(wrapper.vm.animationClass).toBe("animate-shake");
      await wrapper.find(".rounded").trigger("animationend");
      expect(wrapper.vm.animationClass).toBe("");
    });
  });
});
