// set size of margin, and inner values of table
const margin = {top: 0, right: 0, bottom: 200, left: 50},
      width = 960 - margin.left - margin.right,
      height = 800 - margin.top - margin.bottom;
// establish an x range that scales the width of the chart
let x2 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);
// establish a y range that scales the height of the chart
let y2 = d3.scale.linear()
    .range([height, 0]);
// create xAxis that runs the length of x2 on the bottom
const xAxis = d3.svg.axis()
      .scale(x2)
      .orient("bottom");
// create yAxis that runs along the left
const yAxis = d3.svg.axis()
      .scale(y2)
      .orient("left")

// create a chart with the given overall width and height of 960 x 500
const chart = d3.select(".svgChart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
// access data in csv file
d3.csv("MetObjects.csv", convertStringToNumber, (error, data) => {
  data = deptArr(allDepartments(data))
  // create interval of each person ordered alphabetically
  x2.domain(data.map(d => d.name).sort());
  // create range from 0 to maximum value
  y2.domain([0, d3.max(data, d => d.value)]);

  // create div for xAxis line
  chart.append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
  // create yAxis div with a label
  chart.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
    // rotate labels 90 deg
      .attr("transform", "rotate(-90)")
    // shift the position
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
    // set the axis title
      .text("Number of Artifacts");
  // create bars for each piece of data
  chart.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .text(d => d.value)
      .attr("class", "bar")
      .attr("x", d => x2(d.name))
      .attr("y", d => y2(d.value))
      .attr("height", d => height - y2(d.value))
      .attr("width", x2.rangeBand())
  // position x axis labels
  chart.selectAll("g .x .tick text")
      .attr("transform", "rotate(-60)")
      .style("text-anchor", "end")
});
