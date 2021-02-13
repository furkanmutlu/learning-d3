const canvas = d3.select('.canvas');

const svg = canvas
    .append('svg')
    .attr('height', 600)
    .attr('width', 600);

// Append shapes to svg container
// Rectangle
svg
    .append('rect')
    .attr('width', 200)
    .attr('height', 100)
    .attr('fill', 'blue')
    .attr('x', 20)
    .attr('y', 20);

// Circle
svg
    .append('circle')
    .attr('r', 50)
    .attr('cx', 300)
    .attr('cy', 70)
    .attr('fill', 'pink');

// Line
svg
    .append('line');