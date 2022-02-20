
// Create SVG
const width = 400, height = 400;
d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

// Load data from CSV
d3.csv("https://raw.githubusercontent.com/ChrisJMurdoch/DataAnalyticsLab2/main/data/spheres.csv").then(function(data) {
    
    // Create simulation
    const simulation = d3.forceSimulation(data)
        .force('charge', d3.forceManyBody().strength(5))
        .force('center', d3.forceCenter(width/2, height/2))
        .force('collision', d3.forceCollide().radius( (d) => d.radius ))
        .on('tick', tick);
    
    // Update graphics each frame
    function tick() {
        const u = d3.select('svg')
            .selectAll('circle')
            .data(data)
            .join('circle')
            .attr('fill', (d) => d.color)
            .attr('stroke', "black")
            .attr('r', (d) => d.radius)
            .attr('cx', (d) => d.x)
            .attr('cy', (d) => d.y)
    }
});
