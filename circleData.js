const numbers = [60, 60, 60]

const selection = d3.select('.circle')
  .attr('height', 120)
  .attr('width', 720)

function update() {
  selection.selectAll('circle').remove()
  selection.selectAll('.circle').data(numbers)
    .enter().append('circle')
      .attr('cy', d => d)
      .style('fill', 'steelblue')
      .attr('cx', () => Math.random() * 720)
      .attr('r', () => Math.random() * 60)
}

setInterval(update, 1000)

// update()
