
// Data
const data1 = { apples: [5345, 2879, 1997] };
const data2 = { apples: [1234, 7364, 9253, 1934, 1000] };
const data3 = { apples: [3895, 3853, 1532, 9934, 8235, 2462, 9686] };

// Dimensions
const width = 460,
    height = 300,
    radius = Math.min(width, height) / 2;

// Create SVG
const svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Create pie without size sorting
const pie = d3.pie()
    .sort(null);
const arc = d3.arc()
    .innerRadius(radius - 100)
    .outerRadius(radius - 50);

// Colour scheme
const colourScheme = d3.scaleOrdinal().range(d3.schemeSet3);

// Store last data for interpolation
let lastData = {apples: []};

// Update pie chart with new data
function updatePie(data) {

    // Pad data with 0 values for each missing segment
    let padding = data.apples.length - lastData.apples.length;
    for (let i=0; i<padding; i++)
        lastData.apples.push(0);
    for (let i=0; i<-padding; i++)
        data.apples.push(0);

    // Create pie data
    const pieData = pie(data.apples);
    const pieLastData = pie(lastData.apples);
    console.log(pieData, pieLastData);

    // Bind data to path
    const bound = svg.selectAll("path")
        .data(pie(data.apples));
    
    // Enter new segments and apply transition
    bound.enter()
        .append("path")
        .merge(bound)
        .attr("fill", (d, i) => colourScheme(i))
        .attr("d", arc)
        .transition()
        .duration(1000)
        .attrTween("d", function (d, i) {

            const last = pieLastData[i];
            const interpolateS = d3.interpolate(last.startAngle, d.startAngle);
            const interpolateE = d3.interpolate(last.endAngle, d.endAngle);

            return function (t) {
                d.startAngle = interpolateS(t);
                d.endAngle = interpolateE(t);
                return arc(d);
            }
        });
    
    // Save current data for next interpolation
    lastData = data;
}

updatePie(data1);
