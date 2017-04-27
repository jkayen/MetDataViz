// set size of margin3, and inner values of table
const margin3 = {top: 0, right: 0, bottom: 0, left: 0},
      width3 = 3200 - margin3.left - margin3.right,
      height3 = 900 - margin3.top - margin3.bottom;
// establish an x scale that scales the width3 of the chart3
let x3 = d3.scale.ordinal()
    .rangeRoundBands([0, width3]);
// establish a y scale that scales the height3 of the chart3
let y3 = d3.scale.linear()
    .range([height3, 0]);
// create xAxis that runs the length of x3 on the bottom
const xAxis3 = d3.svg.axis()
      .scale(x3)
      .orient("bottom");
// create yAxis that runs along the left
const yAxis3 = d3.svg.axis()
      .scale(y3)
      .orient("left")
// create a chart3 with the given overall width3 and height3 of 960 x 500
const chart3 = d3.select(".years")
      .attr("width", width3 + margin3.left + margin3.right)
      .attr("height", height3 + margin3.top + margin3.bottom)
    .append("g")
      .attr("transform", `translate(${margin3.left},${margin3.top})`)

// access data in csv file
d3.csv('./MetObjects.csv', convertStringToNumber, data => {
  data = getArtifactsByYear(data)
  .map(d => ({num: d.num, year: +d.year}))
  // include artifacts since 2000 B.C.
  .filter(d => d.year > -2000)
  // create interval of each year in order
  x3.domain(data.map(d => d.year).sort((a, b) => a - b));
  // assign y domain from 0 to maximum value in data
  y3.domain([0, d3.max(data, d => d.num)]);
  // create a rect element for every instance in the array
  let bar = chart3.selectAll(".bar")
      .data(data)
    .enter().append("rect")
  // assign attributes based on relative location of data in x and y ranges
      .attr("class", "bar")
  // location calculated from top left
      .attr("x", d => x3(d.year))
      .attr("y", d => y3(d.num))
      .attr("height", d => height3 - y3(d.num))
      .attr("width", x3.rangeBand())
})
