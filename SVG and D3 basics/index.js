const canvas = d3.select('.canvas');

// Append shapes to svg container
// Group
const svg = canvas
    .append('svg')
    .attr('height', 600)
    .attr('width', 600);

const group = svg.append('g');

// Rectangle
group
    .append('rect')
    .attr('width', 200)
    .attr('height', 100)
    .attr('fill', 'blue')
    .attr('x', 20)
    .attr('y', 20);

// Circle
group
    .append('circle')
    .attr('r', 50)
    .attr('cx', 300)
    .attr('cy', 70)
    .attr('fill', 'pink');

// Line
group
    .append('line')
    .attr('x1', 370)
    .attr('x2', 400)
    .attr('y1', 20)
    .attr('y2', 120)
    .attr('stroke', 'red');

// Text
svg
    .append('text')
    .attr('x', 20)
    .attr('y', 200)
    .attr('fill', 'grey')
    .text('Hello D3!')
    .style('font-family', 'arial');