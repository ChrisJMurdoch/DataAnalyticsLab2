const csvfile = "https://raw.githubusercontent.com/ChrisJMurdoch/DataAnalyticsLab2/master/data/stock.csv"

// Create SVG
var svg = d3.select("svg");
var margin = 200;
var width = svg.attr("width") - margin;
var height = svg.attr("height") - margin;
svg.append("text")
    .attr("transform", "translate(100,0)")
    .attr("x", 50)
    .attr("y", 50)
    .attr("font-size", "24px")
    .text("Stock Price")

// Create scales
var x = d3.scaleBand().range([0, width]).padding(0.4);
var y = d3.scaleLinear().range([height, 0]);
var g = svg.append("g")
    .attr("transform", "translate(" + 100 + "," + 100 + ")");

let grad;

// Load data
d3.csv(csvfile).then(function (data) {

    // Create colour scale
    grad = d3.scaleLinear().domain([d3.min(data, (d)=>d.value), d3.max(data, (d)=>d.value)]).range(["red", "yellow"]);

    // Create domains
    x.domain(data.map(function (d) { return d.year; }));
    y.domain([0, d3.max(data, function (d) { return d.value; })]);

    // Axes
    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .append("text")
        .attr("y", height - 250)
        .attr("x", width - 100)
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text("Year");
    g.append("g")
        .call(d3.axisLeft(y).tickFormat(function (d) {
            return "$" + d;
        }).ticks(10))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "-5.1em")
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text("Stock Price");

    // Create bars on chart
    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("fill", "steelblue")
        .attr("class", "bar")
        .on("mouseover", onMouseOver)
        .on("mouseout", onMouseOut)
        .attr("x", function (d) { return x(d.year); })
        .attr("y", function (d) { return y(d.value); })
        .attr("width", x.bandwidth())
        .transition()
        .ease(d3.easeLinear)
        .duration(400)
        .delay(function (d, i) {
            return i * 50;
        })
        .attr("height", function (d) { return height - y(d.value); });
});

//mouseover event handler function
function onMouseOver(event, data) {

    console.log( data.value, grad(data.value) );

    // d3.select(this).attr('class', 'highlight');
    d3.select(this)
        .transition() // adds animation
        .duration(400)
        .attr('width', x.bandwidth() + 5)
        .attr("y", () => y(data.value) - 10)
        .attr("height", () => height - y(data.value) + 10)
        .attr("fill", () => grad(data.value));
    g.append("text")
        .attr('class', 'val')
        .attr('x', function () {
            return x(data.year);
        })
        .attr('y', function () {
            return y(data.value) - 15;
        })
        .text(function () { return '$' + data.value; }); // Value of the text
}
//mouseout event handler function
function onMouseOut(d, i) {
    // use the text label class to remove label on mouseout
    d3.select(this).attr('class', 'bar');
    d3.select(this)
        .transition() // adds animation
        .duration(400)
        .attr('width', x.bandwidth())
        .attr("y", function (d) { return y(i.value); })
        .attr("height", function (d) { return height - y(i.value); })
        .attr("fill", "steelblue");
    d3.selectAll('.val')
        .remove()
}
