
// City names map to the relevant images
const cities = ["Edinburgh", "London", "Paris", "New York"];

const body = d3.select("body");

// Append text and img for each city
for (city of cities) {
    body
        .append("img")
        .attr("src", `images/${city}.jpg`)
    body
        .append("div")
        .text(`This is ${city}!`);
}
