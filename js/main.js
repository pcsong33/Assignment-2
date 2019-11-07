// PART I: Manipulating the DOM

// Step 1: Select the body of the HTML document and append an h2 element
// with the text "We're learning D3!"

d3.select("body").append("h2").text("We're learning D3!");
// Step 2: Select the body again and append a div with the id dynamic-content
d3.select("body").append("div").attr("id", "dynamic-content");
d3.select("#dynamic-content").append("p").text("Brian Yu is going to Nicaragua instead of eating food with me.");
// Step 3: Select the div you just created (using its id!) and append a
// paragraph with some text of your choice (you can also style this if you want!)



// PART II: Binding data

var sandwiches = [
    { name: "Thesis", price: 7.95, size: "large" },
    { name: "Dissertation", price: 8.95, size: "large" },
    { name: "Highlander", price: 6.50, size: "small" },
    { name: "Just Tuna", price: 6.50, size: "small" },
    { name: "So-La", price: 7.95, size: "large" },
    { name: "Special", price: 12.50, size: "small" }
];

// Step 1: Append a new SVG element to HTML document with D3
// (width = 500px, height = 500px)

var svg = d3.select("body").append("svg")
    .attr("width", 500)
    .attr("height", 500);


svg.selectAll("circle")
    .data(sandwiches)
    .enter()
    .append("circle")
    .attr("cx", function(d, i){
        return (i*80 + 60 );
    })
    .attr("cy", 100)

    .attr("r", function(d, i){
    if (d.size === "large") {
        return 30;
    }
    else
    {
        return 15;
    }
    })
    .attr("fill", function(d,i) {
        if (d.price < 7.00) {
            return "green";
        }
        else {
            return "orange";
        }
    })
        .attr("stroke","black");



// Step 2: Append a new SVG circle for every object in the sandwiches array



// Step 3: Define the following dynamic properties for each circle:
//   - Position: Set the x/y coordinates and make sure that the circles don’t overlap each other
//   - Radius: large sandwiches should be twice as big as small ones
//   - Colors: use two different circle colors. One color (fill) for cheap products < 7.00 USD and one for more expensive products
//   - Border: Add a border to every circle (SVG property: stroke)



// PART III: Loading data

// Step 1: Use D3 to load the CSV file "cities.csv". then, print the data
// to the console and inspect it in your browser
var rowConverter = function(d) {
    return {
        country: d.country,
        city: d.city,
        population:parseInt(d.population),
        eu: d.eu,
        x:parseInt(d.x),
        y:parseInt(d.y)
    }
};

d3.csv("./data/cities.csv", rowConverter, function(data) {
    console.log(data);
    create_visualization(data);
});





// Step 2: Filter the dataset: Filter the dataset to only include cities that are
// part of the EU.

var europeanUnion = ["Austria", "Belgium", "Bulgaria", "Croatia",
    "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland", "France",
    "Germany", "Greece", "Hungary", "Ireland", "Italy", "Latvia", "Lithuania",
    "Luxembourg", "Malta", "Netherlands", "Poland", "Portugal", "Romania",
    "Slovakia", "Slovenia", "Spain", "Sweden", "United Kingdom"];

function create_visualization(jellyfishdata) {
    var filtered_data = jellyfishdata.filter(function (row) {
        return row.eu === "true";
    });
    console.log(filtered_data);
    d3.select("body").append("div").attr("id", "dynamic-content");
    d3.select("#dynamic-content").append("p").text("Number of EU countries: " + filtered_data.length);

    var svg_circle = d3.select("body").append("svg")
        .attr("width", 700)
        .attr("height", 550);
    svg_circle.selectAll("circle")
        .data(filtered_data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            return (d.x);
        })
        .attr("cy", function (d) {
            return (d.y);
        })
        .attr("r", function(d){
            if (d.population > 1000000) {
                return 8;
            }
            else {
                return 4;
            }
        })
        .attr("class", "circle");
    svg_circle.selectAll("text")
        .data(filtered_data)
        .enter()
        .append("text")
        .attr("x", function (d) {
            return (d.x+10);
        })

        .attr("y", function (d) {
            return (d.y-10);
        })
        .text(function(d) {
            return(d.city)
        })
        .attr("opacity", function(d) {
            if (d.population < 1000000) {
                return(0)
            }
        })
        .attr("class", "jellyfish");

}






// Step 3: Append a new paragraph to your HTML document that shows the
// number of EU countries




// Step 4: Prepare the data - each value of the CSV file is stored as a string,
// but we want numerical values to be numbers.




// Step 5: Draw an SVG circle for each city in the filtered dataset
//   - All the elements (drawing area + circles) should be added dynamically with D3
//   - SVG container: width = 700px, height = 550px
//   - Use the x/y coordinates from the dataset to position the circles



// Step 6: Change the radius of the circle to be data-dependent
//   - The radius should be 4px for cities with population less than one million
//   - The radius for all other cities should be 8px



// Step 7: Add labels with the names of the European cities
//   - Use the SVG text element
//   - All the elements should be the class of city-label
//   - The labels should only be visible for cities with population greater
//   than one million (use opacity)



// Step 8: Styling - in the external stylesheet, do some styling
//   - Make sure to at least style city-label with font size = 11 px and
//   text anchor = middle


// Optional bonus step: add tooltips displaying the country for each city