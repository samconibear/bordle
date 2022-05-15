import { countries } from "@/assets/countries.js"

function genDateCode() {
  const dt = new Date();
  let dateCode =
    dt.getDate().toString() +
    dt.getMonth().toString() +
    dt.getFullYear().toString();
  dateCode = '2102314142';
  return dateCode;
}

function hash(str, hashCode) {
  const num_countries = countries.length;
  let hash = 0, i, char;
  if (str.length == 0) return hash;
  for (i = 0; i < str.length; i++) {
    char = str.charCodeAt(i);
    hash = ((hash << hashCode) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
    hash = hash % num_countries;
  }
  return hash;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function todaysCountry() {
  // Return the object from countries.js that corresponds to todays date.
  const dateCode = genDateCode();
  const countryIndex = hash(dateCode, 5);
  countries.sort((a,b) => {
    if (a.code < b.code) { return -1; }
    if (a.code > b.code) { return 1; }
    return 0;
  });
  return countries[countryIndex];
}

export function todaysChoices() {
  // Return the object from countries.js that corresponds to todays date.
  let dateCode = genDateCode();
  console.log(dateCode);
  const countryIndexes = [
    hash(dateCode, 1),
    hash(dateCode, 2),
    hash(dateCode, 3),
    hash(dateCode, 4),
    hash(dateCode, 5),
    hash(dateCode, 6),
    hash(dateCode, 7),
    hash(dateCode, 8),
  ];
  countries.sort((a,b) => {
    if (a.code < b.code) { return -1; }
    if (a.code > b.code) { return 1; }
    return 0;
  });
  let choices = countryIndexes.map(i => countries[i]);
  choices.forEach(c => {c.cssFilter = '';})
  return shuffle(choices);
}