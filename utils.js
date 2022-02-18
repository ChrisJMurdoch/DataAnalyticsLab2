
// Populate the menu with a section header and buttons that link to their respective URLs
function populateMenu(section, exercises) {
    let div = d3.select("#menu").append("div");
    div.append("h3").text(`${section}`);
    for (exercise of exercises)
        div.append("button").attr("onclick", `switchExercise("${exercise}");`).text(`${exercise}`);
}

// Switch the actively-displayed exercise
function switchExercise(name) {

    // Exercise title
    d3.select("#exercise_title").text(`${name}`);

    // Exercise output
    d3.select("#display").attr("src", `./exercises/${name}/exercise.html`);

    // Load exercise code into Prism.js box
    fetch(`https://raw.githubusercontent.com/ChrisJMurdoch/DataAnalyticsLab2/main/exercises/${name}/exercise.js`)
        .then(response => response.text())
        .then( function(text) {
            d3.select("#js_box").text( text );
            Prism.highlightAll(); // Re-render Prism.js code
        });
    fetch(`https://raw.githubusercontent.com/ChrisJMurdoch/DataAnalyticsLab2/main/exercises/${name}/exercise.css`)
        .then(response => response.text())
        .then( function(text) {
            d3.select("#css_box").text( text );
            Prism.highlightAll(); // Re-render Prism.js code
        });
}
