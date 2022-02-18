
const data = [1, 2, 3]

const svg = d3.select('body')
    .append("svg")
    .attr("width", "400px")
    .attr("height", "300");

svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => `${d*100}px`)
    .attr("cy", "150px")
    .attr("r", "25px")
    .attr("fill", "green");

svg.selectAll("circle")
    .on("mouseover", function (event) {

        // Set grow
        d3.select(this)
            .transition()
            .ease(d3.easeLinear)
            .duration(200)
            .attr("r", "35px")
            .attr("fill", "orange");
    })
    .on("mouseout", function () {
        
        // Unset grow
        d3.select(this)
            .transition()
            .ease(d3.easeBounce)
            .duration(700)
            .attr("r", "25px")
            .attr("fill", "steelblue");
    });

svg.append("text")
    .text("This is an SVG text element.")
    .attr("x", "20")
    .attr("y", "30")
    .style("font-size", "1em")
    .on("mouseover", function (event) {

        // Set grow
        d3.select(this)
            .transition()
            .ease(d3.easeLinear)
            .duration(200)
            .style("font-size", "1.5em")
            .attr("fill", "orange");
    })
    .on("mouseout", function () {
        
        // Unset grow
        d3.select(this)
            .transition()
            .ease(d3.easeBounce)
            .duration(700)
            .style("font-size", "1em")
            .attr("fill", "black");
    });
