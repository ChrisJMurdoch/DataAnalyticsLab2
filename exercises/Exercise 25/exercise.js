
let cc = d3.interpolate('red', 'green')
console.log( cc(0.5) );

d3.select("body")
    .append("h3")
    .style("color", `${cc(0.5)}`)
    .text("The interpolated colour is brown, as it's halfway between red and green.");
