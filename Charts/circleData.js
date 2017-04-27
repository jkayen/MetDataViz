const numbers = new Array(~~(Math.random() * 10))

const selection = d3.select('.circle')
  .attr('height', 720)
  .attr('width', 720)

const update = () => {
  selection.selectAll('circle').remove()
  selection.selectAll('.circle').data(numbers)
    .enter().append('circle')
      .attr('cy', d => Math.random() * 720)
      .style('fill', 'steelblue')
      .attr('cx', () => Math.random() * 720)
      .attr('r', () => Math.random() * 60)
}

setInterval(update, 1000)

