const svg = d3
    .select('.canvas')
    .append('svg')
    .attr('width', 600)
    .attr('height', 600);

// Create margins and dimension
const margin = {
    top: 20,
    right: 20,
    bottom: 100,
    left: 100
};
const graphWidth = 600 - margin.left - margin.right;
const graphHeight = 600 - margin.top - margin.bottom;

const graph = svg
    .append('g')
    .attr('width', graphWidth)
    .attr('height', graphHeight)
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

d3
    .json('menu.json')
    .then(data => {
        const y = d3
            .scaleLinear()
            .domain([0, d3.max(data, d => d.orders)])
            .range([0, 500]);

        const x = d3
            .scaleBand()
            .domain(data.map(item => item.name))
            .range([0, 500])
            .paddingInner(0.2)
            .paddingOuter(0.2);

        // Join the data to rects
        const rects = graph
            .selectAll('rect')
            .data(data);

        rects
            .attr('width', x.bandwidth)
            .attr('height', d => y(d.orders))
            .attr('fill', 'orange')
            .attr('x', d => x(d.name));

        // Append the enter selection to the DOM
        rects
            .enter()
            .append('rect')
            .attr('width', x.bandwidth)
            .attr('height', d => y(d.orders))
            .attr('fill', 'orange')
            .attr('x', d => x(d.name));
    });