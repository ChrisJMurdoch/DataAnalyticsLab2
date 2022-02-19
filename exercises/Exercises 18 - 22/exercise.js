
// Create the datasets
const data1 = {
    colour: "red",
    data: [
        { group: "A", value: 5 },
        { group: "B", value: 20 },
        { group: "C", value: 9 }
    ]
};
const data2 = {
    colour: "blue",
    data: [
        { group: "A", value: 10 },
        { group: "B", value: 2 },
        { group: "C", value: 22 },
        { group: "D", value: 18 }
    ]
};
const data3 = {
    colour: "green",
    data: [
        { group: "A", value: 10 },
        { group: "B", value: 17 },
        { group: "C", value: 5 },
        { group: "D", value: 7 },
        { group: "E", value: 14 }
    ]
};

// Set the dimensions and margins of the graph
const margin = { top: 100, right: 30, bottom: 30, left: 30 };
const width = 460 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

// Create SVG
const svg = d3.select('body')
    .append('div')
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Update the graph with given data
function update(data) {

    // Fade out previous axes
    d3.selectAll(".axis")
        .transition()
        .duration(1000)
        .style("opacity", "0")
        .remove();

    // X axis
    const x = d3.scaleBand()
        .range([0, width])
        .domain(data.data.map((d) => d.group))
        .padding(0.2);
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0, 0)`)
        .call(d3.axisTop(x));
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([0, 25])
        .range([height, 0]);
    svg.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y));
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${width}, 0)`)
        .call(d3.axisRight(y));

    // Bind new data to rects
    const u = svg.selectAll("rect")
        .data(data.data);

    // Remove extra bars
    u.exit()
        .remove();
    
    // Add and transition new bars
    u.enter()
        .append("rect")
        .merge(u)
        .on("mouseover", function(e, d) { // Add text on hover
            d3.select("svg")
                .append("text")
                .attr("id", "hovertext")
                .attr("x", `${margin.left+x(d.group)+x.bandwidth()/2}px`)
                .attr("y", `${margin.top+y(d.value)-10}px`)
                .text(`${d.value}`);
        })
        .on("mouseout", function(e, d) { // Remove text on leave
            d3.selectAll("#hovertext")
                .remove();
        })
        .transition()
        .duration(1000)
        .attr("x", (d) => x(d.group))
        .attr("y", (d) => y(d.value))
        .attr("width", x.bandwidth())
        .attr("height", (d) => height - y(d.value))
        .attr("fill", data.colour);
}

// Initialize the plot with the first dataset
update(data1)
