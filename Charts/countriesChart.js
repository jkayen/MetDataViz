// COLOR SCALE
const many = '#3c4414';
const few = '#e6f2b0';

// setup world map
const map = new Datamap({
  element: document.getElementById('container'),
  fills: {
    LOW: few,
    HIGH: many,
    defaultFill: '#F5F5F5'
  },
  geographyConfig: {
    // display on hover the number of artifacts in each country
    popupTemplate: (geo, data) => {
      if (data) {
        return `<div class="hoverinfo"><strong>${geo.properties.name}</strong><br>Number of Artifacts: ${data.numArtifacts}</strong></div>`
      }
    }
  }
});

// create color scale up to a value of 2000
const paletteScale = d3.scale.linear()
      .domain([1, 2000])
      .range([few, many])

// analyze db
d3.csv('MetObjects.csv', data => {
  // get artifacts by country and determine the three-letter country code used by datamaps
  const dbCountries = getCountryByCode(getAllCountriesInDB(data))
  // convert array of objects to an object of objects for map to render
  let dataset = {};
  dbCountries.forEach(c => {
    dataset[c.code] = {numArtifacts: c.value, fillColor: paletteScale(c.value)}
  })
  // apply dataset to the map
  map.updateChoropleth(dataset)
})
