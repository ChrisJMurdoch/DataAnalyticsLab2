
// Current X and Y force strength
const clickForceStrength = -0.06, // Repulsion force
      clickForceDuration = 50,
      returnForceStrength = 0.0005; // 100 Milliseconds
let xyForce = 0;
let xyForceOrigin = {x:0 , y:0};

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

    // Centre planets
    for (let i=0; i<data.length; i++) {
        data[i].x = width/2;
        data[i].y = height/2;
    }

    // Create simulation
    const simulation = d3.forceSimulation(data)
        .force('charge', d3.forceManyBody().strength((d) => d.radius*0.05))
        .force("return_x", d3.forceX(width/2).strength(returnForceStrength))
        .force("return_y", d3.forceY(height/2).strength(returnForceStrength))
        .force('collision', d3.forceCollide().radius((d) => d.radius))
        .alphaDecay(0) // Set to never converge
        .on('tick', tick);
    
    // Add event to svg click
    svg.on("click", svgClick);

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

    // Activate when canvas is clicked
    let sparkId = data.length;
    function svgClick(e, d) {

        // Set force strength and position
        const pointer = d3.pointer(e);
        xyForce = clickForceStrength;
        xyForceOrigin = {x:pointer[0], y:pointer[1]};

        // Create 50 blast particles
        for (let i=0; i<50; i++) {

            // Particle parameters
            const blastRadius = 75;

            // Random position
            const angle = Math.random() * Math.PI * 2;
            const offset = Math.random() * blastRadius;
            const xOffset = Math.cos(angle)*offset;
            const yOffset = Math.sin(angle)*offset;

            // Colouring
            const heat = Math.random();

            // Size and lifetime
            const radius = 1 + 3*Math.random();
            
            // Add new particle to data
            data.push({
                x:pointer[0] + xOffset,
                y:pointer[1] + yOffset,
                radius: radius,
                color:  `rgb(255, ${200+heat*55}, ${heat*255})`,
                text: `Debris ${sparkId}`,
            });

            // Schedule particle death
            let id = sparkId;
            setTimeout(function() {
                data = data.filter(function(value, index, arr){ 
                    return value.text !== `Debris ${id}`;
                });
                simulation.nodes(data);
            }, radius*500)

            sparkId++
        }

        // Re-initialise simulation data
        simulation.nodes(data);
    }

    // Bind the hovertext to a specific particle ID
    function bindHovertext(id, float) {
        hovertextTarget = id;
        hovertextFloat = float;
    }

    // Refresh elements and simulation periodically
    function refresh() {

        // Update hovertext position over planet
        if (hovertextTarget===null) {
            d3.select("#hovertext")
                .text("")
                .attr("x", "-100px")
                .attr("y", "-100px");
        } else {
            const targetElement = d3.select(`#${hovertextTarget.replace(" ", "")}`);
            d3.select("#hovertext")
                .text(hovertextTarget)
                .attr("x", `${targetElement.attr("cx")}px`)
                .attr("y", `${targetElement.attr("cy")-hovertextFloat}px`);
        }

        // Decay X and Y forces
        const forceDecay = 10 * -clickForceStrength / clickForceDuration;
        xyForce += forceDecay;
        xyForce = (forceDecay>0) ? Math.min(0, xyForce) : Math.max(0, xyForce);

        // Update forces
        simulation
            .force("x", d3.forceX(xyForceOrigin.x).strength(xyForce))
            .force("y", d3.forceY(xyForceOrigin.y).strength(xyForce));

        // Schedule call again ~100 times a second
        setTimeout(refresh, 10);
    }
    refresh();
});
