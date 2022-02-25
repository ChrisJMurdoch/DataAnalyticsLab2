
// 3 circles
const data = [1, 2, 3]

// Creat SVG
const svg = d3.select('body')
    .append("svg")
    .attr("width", "400px")
    .attr("height", "300");

// Add circles
svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => `${d*100}px`)
    .attr("cy", "150px")
    .attr("r", "25px")
    .attr("fill", "green")
    .attr("class", "transitional");

svg.selectAll("circle")
    .on("mousemove", function (event) {

        // Set grow
        d3.select(this)
            .attr("fill", "orange")
            .classed("grow", true);
        
        // Add div
        d3.select("body")
            .selectAll(".ptr")
            .data([1])
            .enter()
            .append("div")
            .attr("class", "ptr")
            .text("Circle!")
            .style("position", "absolute");
        
        // Update ptr
        const ptr = d3.pointer(event);
        d3.select("body")
            .selectAll(".ptr")
            .style("left", `${ptr[0]}px`)
            .style("top", `${ptr[1]}px`);
    })
    .on("mouseout", function () {
        
        // Unset grow
        d3.select(this)
            .attr("fill", "steelblue")
            .classed("grow", false);

        // Remove div
        d3.select("body")
            .selectAll(".ptr")
            .remove();
    });
