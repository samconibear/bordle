import { shallowMount } from "@vue/test-utils";
import GuessWord from "@/components/GuessWord.vue";

const country = { code: "US", name: "United States", latitude: 37.09, longitude: -95.71 };

describe("GuessWord.vue", () => {
  it("renders the country name", () => {
    const wrapper = shallowMount(GuessWord, { propsData: { country } });
    expect(wrapper.text()).toContain("United States");
  });

  it("displays updated name when country prop changes", async () => {
    const wrapper = shallowMount(GuessWord, { propsData: { country } });
    await wrapper.setProps({
      country: { code: "FR", name: "France", latitude: 46.23, longitude: 2.21 },
    });
    expect(wrapper.text()).toContain("France");
    expect(wrapper.text()).not.toContain("United States");
  });

  it("renders the name in a paragraph tag", () => {
    const wrapper = shallowMount(GuessWord, { propsData: { country } });
    expect(wrapper.find("p").text()).toContain("United States");
  });
});
