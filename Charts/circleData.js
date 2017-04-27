// give div a size
const selection = d3.select('.circle')
  .attr('height', 720)
  .attr('width', 720)

const update = () => {
  // create array of random length
  const numbers = new Array(~~(Math.random() * 10))
  // remove previous circles
  selection.selectAll('circle').remove()
  // apply data to new circles
  selection.selectAll('.circle').data(numbers)
    .enter().append('circle')
    // randomly assign color, size, and location to each circle
      .attr('r', () => Math.random() * 60)
      .attr('cx', () => Math.random() * 720)
      .attr('cy', d => Math.random() * 720)
      .style('fill', 'steelblue')
}
// update circles every second
setInterval(update, 1000)

