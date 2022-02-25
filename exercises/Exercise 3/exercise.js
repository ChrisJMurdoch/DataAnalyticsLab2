
// 3 elements for 3 buttons
const data = [1, 2, 3]

d3.select('body')
    .selectAll("div")
    .data(data)
    .enter()
    .append('div')
    .style('width', '450px')
    .style('height', '40px')
    .style('background-color', 'green')
    .style("margin-bottom", "5px");

d3.selectAll("div")

    // Set rainbow class
    .on("mouseover", function (event) {
        d3.select(this)
            .style("background-color", "orange")
            .classed("rainbow_border", true);
    })
    
    // Unset rainbow class
    .on("mouseout", function () {
        d3.select(this)
            .style("background-color", "steelblue")
            .classed("rainbow_border", false);
    });
