
// Load line graph code
d3.select("body")
    .append("script")
    .attr("src", "../../common/plotDottedLine.js");

// Wait for loaded callback
plotDottedLine_loaded = function() {
        
    // Create data points
    const numPoints = 40;
    let dataA=[], dataB=[];
    for (let i = 0; i < numPoints; i++) {
        dataA.push( {x: i/100, y: Math.sin( 20*i / 100 ) } );
        dataB.push( {x: i/100, y: Math.cos( 20*i / 100 ) } );
    }

    // Plot data
    let svgA = plotDottedLine(dataA, "#0059ff", false);
}
