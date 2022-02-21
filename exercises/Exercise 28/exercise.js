
// Stop d3 caching result
function nocache(url) { // From https://stackoverflow.com/a/47870218
    return `${url}?nocache=${new Date().getTime()}`;
}

// Create SVG
const width = 600, height = 600;
const svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

// Add canvas for drawing
const canvas = svg.append("g")
    .attr('width', width)
    .attr('height', height);

// create hovertext element
let hovertextTarget = null;
let hovertextFloat = 0;
svg.append("text")
    .attr("id", "hovertext")
    .attr("x", "-100px")
    .attr("y", "-100px")
    .attr("text-anchor", "middle")
    .attr("fill", "white")
    .attr("font-family", "Arial")
    .attr("filter", "drop-shadow(0 0 8px rgba(0, 0, 0, 1))");

// Load data from CSV
d3.csv(nocache("https://raw.githubusercontent.com/ChrisJMurdoch/DataAnalyticsLab2/main/data/planets.csv")).then(function (data) {

    console.log(data);

    // Create simulation
    const simulation = d3.forceSimulation(data)
        .force('charge', d3.forceManyBody().strength(5))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius((d) => d.radius))
        .on('tick', tick);

    // Update graphics each frame
    function tick() {

        // Update particles
        canvas.selectAll('circle')
            .data(data)
            .join('circle')
            .attr("id", (d) => d.text.replace(" ", ""))
            .attr("class", "particle")
            .attr('fill', (d) => d.color)
            .attr('stroke', "black")
            .attr('r', (d) => d.radius)
            .attr('cx', (d) => d.x)
            .attr('cy', (d) => d.y)
            .on("mouseover", (e, d) => bindHovertext(d.text, parseInt(d.radius)*1.05+5) )
            .on("mouseout",  (e, d) => bindHovertext(null, 0) );
    }

    // Bind the hovertext to a specific particle ID
    function bindHovertext(id, float) {
        hovertextTarget = id;
        hovertextFloat = float;
    }
});

function updateHovertext() {

    // If no target, move out of the canvas
    if (hovertextTarget===null) {
        d3.select("#hovertext")
            .text("")
            .attr("x", "-100px")
            .attr("y", "-100px");
    
    // If target, float above
    } else {
        const targetElement = d3.select(`#${hovertextTarget.replace(" ", "")}`);
        d3.select("#hovertext")
            .text(hovertextTarget)
            .attr("x", `${targetElement.attr("cx")}px`)
            .attr("y", `${targetElement.attr("cy")-hovertextFloat}px`);
    }

    // Schedule call again
    setTimeout(updateHovertext, 0);
}
updateHovertext();
