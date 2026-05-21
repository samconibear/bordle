import { genDateCode, hash, shuffle, todaysCountry, todaysChoices } from "@/js/daily.js";
import { countries } from "@/assets/countries.js";

describe("genDateCode", () => {
  it("returns a string", () => {
    expect(typeof genDateCode()).toBe("string");
  });

  it("returns a non-empty string", () => {
    expect(genDateCode().length).toBeGreaterThan(0);
  });

  it("contains the current day and year", () => {
    const dt = new Date();
    const dateCode = genDateCode();
    expect(dateCode).toContain(dt.getDate().toString());
    expect(dateCode).toContain(dt.getFullYear().toString());
  });

  it("returns the same value on repeated calls within the same day", () => {
    expect(genDateCode()).toBe(genDateCode());
  });
});

describe("hash", () => {
  it("returns 0 for an empty string", () => {
    expect(hash("", 5)).toBe(0);
  });

  it("returns a non-negative integer", () => {
    const result = hash("15112023", 5);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(Number.isInteger(result)).toBe(true);
  });

  it("returns an index within the countries array bounds", () => {
    const result = hash("15112023", 5);
    expect(result).toBeLessThan(countries.length);
  });

  it("is deterministic — same inputs always yield the same output", () => {
    const str = "15112023";
    expect(hash(str, 5)).toBe(hash(str, 5));
    expect(hash(str, 1)).toBe(hash(str, 1));
  });

  it("returns values within bounds for all hashCodes used in todaysChoices", () => {
    const str = "15112023";
    [1, 2, 3, 4, 5, 6, 7, 8].forEach((code) => {
      const result = hash(str, code);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(countries.length);
    });
  });

  it("produces different results for different hashCodes on the same string", () => {
    const str = "15112023";
    const results = [1, 2, 3, 4, 5, 6, 7, 8].map((code) => hash(str, code));
    const unique = new Set(results);
    expect(unique.size).toBeGreaterThan(1);
  });
});

describe("shuffle", () => {
  it("returns the same array reference", () => {
    const arr = [1, 2, 3];
    expect(shuffle(arr)).toBe(arr);
  });

  it("preserves array length", () => {
    const arr = [1, 2, 3, 4, 5];
    shuffle(arr);
    expect(arr).toHaveLength(5);
  });

  it("contains all original elements after shuffling", () => {
    const arr = [1, 2, 3, 4, 5];
    const original = [...arr];
    shuffle(arr);
    expect(arr.slice().sort((a, b) => a - b)).toEqual(original.slice().sort((a, b) => a - b));
  });

  it("handles an empty array without error", () => {
    expect(shuffle([])).toEqual([]);
  });

  it("handles a single-element array", () => {
    expect(shuffle([42])).toEqual([42]);
  });
});

describe("todaysCountry", () => {
  it("returns a defined value", () => {
    expect(todaysCountry()).toBeDefined();
  });

  it("returns an object with code, name, latitude, and longitude", () => {
    const country = todaysCountry();
    expect(country).toHaveProperty("code");
    expect(country).toHaveProperty("name");
    expect(country).toHaveProperty("latitude");
    expect(country).toHaveProperty("longitude");
  });

  it("returns a country that exists in the countries list", () => {
    const country = todaysCountry();
    const found = countries.find((c) => c.code === country.code);
    expect(found).toBeDefined();
  });

  it("returns the same country on repeated calls", () => {
    const first = todaysCountry();
    const second = todaysCountry();
    expect(first.code).toBe(second.code);
    expect(first.name).toBe(second.name);
  });
});

describe("todaysChoices", () => {
  it("returns an array", () => {
    expect(Array.isArray(todaysChoices())).toBe(true);
  });

  it("returns exactly 8 choices", () => {
    expect(todaysChoices()).toHaveLength(8);
  });

  it("each choice has code, name, latitude, longitude, and cssFilter", () => {
    todaysChoices().forEach((choice) => {
      expect(choice).toHaveProperty("code");
      expect(choice).toHaveProperty("name");
      expect(choice).toHaveProperty("latitude");
      expect(choice).toHaveProperty("longitude");
      expect(choice).toHaveProperty("cssFilter");
    });
  });

  it("sets cssFilter to an empty string on every choice", () => {
    todaysChoices().forEach((choice) => {
      expect(choice.cssFilter).toBe("");
    });
  });

  it("includes today's country among the choices", () => {
    const country = todaysCountry();
    const codes = todaysChoices().map((c) => c.code);
    expect(codes).toContain(country.code);
  });

  it("all choices come from the countries list", () => {
    const allCodes = new Set(countries.map((c) => c.code));
    todaysChoices().forEach((choice) => {
      expect(allCodes.has(choice.code)).toBe(true);
    });
  });
});
