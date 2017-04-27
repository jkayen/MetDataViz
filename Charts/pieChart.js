      // access pie div
const svg = d3.select(".pie"),
      // set width and height
      width4 = +svg.attr("width"),
      height4 = +svg.attr("height"),
      // determine radius of overall chart
      radius = Math.min(width4, height4) / 2,
      //  position g's from the center of the chart
      g = svg.append("g").attr('transform', `translate(${width4 / 2},${height4 / 2})`),
      // set max and min colors and set across range
      color = d3.scale.linear()
        .domain([0, 150000])
        .range(["#e2b7ff", "#7b00ce"]),
      // create pie with values based on size of collection
      pie = d3.layout.pie()
        .sort(null)
        .value(d => d.value),
      // create paths with the arc that end 10px less than the radius of the circle
      path = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0),
      // set positioning of labels
      label = d3.svg.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);
// access database
d3.csv('./MetObjects.csv', data => {
  // list departments by size
  data = deptArr(allDepartments(data));
  // create g elements for every piece of data with the class of 'arc'
  const arc = g.selectAll('.arc')
    .data(pie(data))
    .enter().append('g')
      .attr("class", "arc");
  // nest a path element within each container
  arc.append("path")
      .attr('d', path)
      .attr('fill', d => color(d.data.value)); // maybe value should be name?
  // set labels
  arc.append("text")
    .attr("transform", d => `translate(${label.centroid(d)})`)
    .attr('dy', '0.35em')
    .text(d => {
      if (d.data.value > 10000) {
        return d.data.name
      }
    });
})
