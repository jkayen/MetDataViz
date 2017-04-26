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
    popupTemplate: function(geo, data) {
                  // don't show tooltip if country don't present in dataset
                  if (!data) { return ; }
                  // tooltip content
                  return ['<div class="hoverinfo">',
                      '<strong>', geo.properties.name, '</strong>',
                      '<br>Count: <strong>', data.numArtifacts, '</strong>',
                      '</div>'].join('');
    }
  }
});
// show legend with colors
map.legend();
// create color scale
const paletteScale = d3.scale.linear()
      .domain([1, 10000])
      .range([few, many])




// analyze db for countries
d3.csv('MetObjects.csv', data => {
  // get artifacts by country
  const dbCountries = getCountryByCode(getAllCountriesInDB(data))
  // convert object to dataset for map to render
  let dataset = {};
  dbCountries.forEach(c => {
    dataset[c.code] = {numArtifacts: c.value, fillColor: paletteScale(c.value)}
  })

  map.updateChoropleth(dataset)
  // console.log(dataset)


})
