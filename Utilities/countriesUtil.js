// create an array of objects with country name, code, and value
const countries =  Datamap
  .prototype.worldTopo.objects.world.geometries
  .map(obj => (
    {name: obj.properties.name,
    code: obj.id,
    value: 1}
  ))

// console.log(countries)
// convert data to object with country and its number of artifacts
const getAllCountriesInDB = data => {
  let obj = {}
  data.forEach(d => {
    if (!obj[d.Country]) {
      obj[d.Country] = 1;
    } else {
      obj[d.Country]++;
    }
  })
  delete obj['']
  return obj;
}
// refine db countries list
const getCountryByCode = objOfCountries => {
  // copy countries list and updated country names to emulate database
  let updatedCountriesList = countries;
  updatedCountriesList[168].name = 'United States';
  // loop through countries in db and combine names that are included in extraneous labels
  for (let countryName in objOfCountries) {
    for (let i = 0; i < updatedCountriesList.length; i++) {
      if (countryName.includes(updatedCountriesList[i].name)) {
        updatedCountriesList[i].value = updatedCountriesList[i].value + objOfCountries[countryName]
      }
    }
  }
  // if country is only listed with 1 value, remove country from list
  return updatedCountriesList.filter(c => c.value > 1);
}
