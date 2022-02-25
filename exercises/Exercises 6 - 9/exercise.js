
function addTransitioningDiv(easing) {

    // Initial div and transitions
    d3.select('body')
        .append("div")
        .style('width', '100px')
        .style('height', '100px')
        .style('background-color', 'blue')
        .style("margin-bottom", "5px")

        .transition() // In transition
        .ease(easing)
        .duration(1000)
        .style('width', '80px')
        .style('height', '80px')

        .transition() // Out transition
        .ease(easing)
        .duration(2000)
        .style('width', '150px')
        .style('height', '150px');

    // Reactive transitions
    d3.select('body').selectAll("div").on("mouseover", function (event) {

            // Transition to red
            d3.select(this)
                .transition()
                .ease(easing)
                .duration(500)
                .style("background-color", "red");
        })
        .on("mouseout", function () {
            
            // Transition back to blue
            d3.select(this)
                .transition()
                .ease(easing)
                .duration(500)
                .style("background-color", "blue");
        });
}

// Add divs to page
addTransitioningDiv(d3.easeLinear);
addTransitioningDiv(d3.easeBounce);
addTransitioningDiv(d3.easeSin);
