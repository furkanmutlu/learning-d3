const svg = d3.select('svg');

d3
    .json('menu.json')
    .then(data => {
        const y = d3
            .scaleLinear()
            .domain([0, 1000])
            .range([0, 500]);

        const x = d3
            .scaleBand()
            .domain(data.map(item => item.name))
            .range([0, 500])
            .paddingInner(0.2)
            .paddingOuter(0.2);

        // Join the data to rects
        const rects = svg
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