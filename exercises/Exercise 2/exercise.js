
const cities = ["Edinburgh", "London", "Paris", "New York"];

const body = d3.select("body");
for (city of cities) {
    body
        .append("img")
        .attr("src", `images/${city}.jpg`)
    body
        .append("div")
        .text(`This is ${city}!`);
}
