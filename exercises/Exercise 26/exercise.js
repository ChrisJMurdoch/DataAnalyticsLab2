
const interpolate = d3.interpolateDate(
    new Date("2000-01-01"),
    new Date("2022-02-19")
);

d3.select("body")
    .append("h3")
    .text(`${interpolate(0.5)}`)
