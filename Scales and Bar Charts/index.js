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

const xAxisGroup = graph
    .append('g')
    .attr('transform', `translate(0, ${graphHeight})`);
const yAxisGroup = graph.append('g');

// Scales
const y = d3
    .scaleLinear()
    .range([graphHeight, 0]);

const x = d3
    .scaleBand()
    .range([0, 500])
    .paddingInner(0.2)
    .paddingOuter(0.2);

// Create the axes
const xAxis = d3.axisBottom(x);
const yAxis = d3
    .axisLeft(y)
    .ticks(3)
    .tickFormat(d => d + ' orders');

// Update x axis text
xAxisGroup
    .selectAll('text')
    .attr('transform', 'rotate(-40)')
    .attr('text-anchor', 'end')
    .attr('fill', 'orange');

// Update function
const update = (data) => {
    // Updating scale domains
    y.domain([0, d3.max(data, d => d.orders)]);
    x.domain(data.map(item => item.name));

    // Join the data to rects
    const rects = graph
        .selectAll('rect')
        .data(data);

    // Remove exit selection
    rects.exit().remove();

    // Update current shapes in DOM
    rects
        .attr('width', x.bandwidth)
        .attr('height', d => graphHeight - y(d.orders))
        .attr('fill', 'orange')
        .attr('x', d => x(d.name))
        .attr('y', d => y(d.orders));

    // Append the enter selection to the DOM
    rects
        .enter()
        .append('rect')
        .attr('width', x.bandwidth)
        .attr('height', 0)
        .attr('fill', 'orange')
        .attr('x', d => x(d.name))
        .attr('y', graphHeight)
        .transition().duration(500)
            .attr('y', d => y(d.orders))
            .attr('height', d => graphHeight - y(d.orders));

    // Call axes
    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);
};

let data = [];

db
    .collection('dishes')
    .onSnapshot(res => {
        res.docChanges().forEach(change => {
            const doc = { ...change.doc.data(), id: change.doc.id };

            switch (change.type) {
                case 'added':
                    data.push(doc);
                    break;
                case 'modified':
                    const index = data.findIndex(item => item.id === doc.id);
                    data[index] = doc;
                    break;
                case 'removed':
                    data = data.filter(item => item.id != doc.id);
                    break;
                default:
                    break;
            }
        });

        update(data);
    });