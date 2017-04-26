const svg = d3.select(".pie"),
      width4 = +svg.attr("width"),
      height4 = +svg.attr("height"),
      radius = Math.min(width4, height4) / 2,
      g = svg.append("g").attr('transform', `translate(${width4 / 2},${height4 / 2})`),
      color = d3.scale.ordinal(d3.schemeCategory20c),
      pie = d3.layout.pie()
        .sort(null)
        .value(d => d.value),
      path = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0),
      label = d3.svg.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);



d3.csv('./MetObjects.csv', data => {
  data = deptArr(allDepartments(data));

  const arc = g.selectAll('.arc')
    .data(pie(data))
    .enter().append('g')
      .attr("class", "arc");

  arc.append("path")
      .attr('d', path)
      .attr('fill', d => color(d.data.value)); // maybe value should be name?

  arc.append("text")
    .attr("transform", d => `translate(${label.centroid(d)})`)
    .attr('dy', '0.35em')
    .text(d => {
      if (d.data.value > 10000) {
        return d.data.name
      }
    });
})
