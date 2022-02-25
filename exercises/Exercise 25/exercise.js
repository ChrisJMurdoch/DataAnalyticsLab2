
// Interpolate colours
let cc = d3.interpolate('red', 'green')

// Append interpolated colour
d3.select("body")
    .append("h3")
    .style("color", `${cc(0.5)}`)
    .text("The interpolated colour is brown, as it's halfway between red and green.");
