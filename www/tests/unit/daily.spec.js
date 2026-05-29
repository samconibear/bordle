import { todaysCountry, todaysChoices } from "@/js/daily.js";
import { countries } from "@/assets/countries.js";

describe("daily.js", () => {
  describe("todaysCountry", () => {
    it("returns an object with the required country fields", () => {
      const country = todaysCountry();
      expect(country).toHaveProperty("code");
      expect(country).toHaveProperty("name");
      expect(country).toHaveProperty("latitude");
      expect(country).toHaveProperty("longitude");
    });

    it("returns a country that exists in the countries list", () => {
      const country = todaysCountry();
      expect(countries.some((c) => c.code === country.code)).toBe(true);
    });

    it("returns the same country on repeated calls (deterministic)", () => {
      const first = todaysCountry();
      const second = todaysCountry();
      expect(first.code).toBe(second.code);
    });

    it("returns a country with a two-letter code", () => {
      const country = todaysCountry();
      expect(country.code).toMatch(/^[A-Z]{2}$/);
    });
  });

  describe("todaysChoices", () => {
    it("returns exactly 8 choices", () => {
      const choices = todaysChoices();
      expect(choices).toHaveLength(8);
    });

    it("always includes today's country", () => {
      const country = todaysCountry();
      const choices = todaysChoices();
      const codes = choices.map((c) => c.code);
      expect(codes).toContain(country.code);
    });

    it("clears cssFilter to empty string on every choice", () => {
      const choices = todaysChoices();
      choices.forEach((choice) => {
        expect(choice.cssFilter).toBe("");
      });
    });

    it("returns country objects with required fields", () => {
      const choices = todaysChoices();
      choices.forEach((choice) => {
        expect(choice).toHaveProperty("code");
        expect(choice).toHaveProperty("name");
        expect(choice).toHaveProperty("latitude");
        expect(choice).toHaveProperty("longitude");
      });
    });

    it("returns the same set of country codes on repeated calls (deterministic)", () => {
      const first = todaysChoices()
        .map((c) => c.code)
        .sort();
      const second = todaysChoices()
        .map((c) => c.code)
        .sort();
      expect(first).toEqual(second);
    });
  });
});
