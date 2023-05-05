// EVENTS

$(document).on("input", "input[type='range']", display);
$(document).on("change", "input[type='range']", analyze);

// FUNCTIONS

function display() {

    var m = $("#month").val().padStart(2, "0");
    var d = $("#day").val().padStart(2, "0");
    var h = $("#hour").val().padStart(2, "0")

    $("#display_month").text(m);
    $("#display_day").text(d);
    $("#display_hour").text(h);
}


async function analyze() {
  var m = $("#month").val().padStart(2, "0");
  var d = $("#day").val().padStart(2, "0");
  var h = $("#hour").val().padStart(2, "0");
  var mdh = m + d + h;

  $("#display_temp").text("...");

  try {
    const response = await fetch(`/predict?input=${mdh}`);
    if (response.ok) {
      const data = await response.text();
      drawPrediction(data);
    } else {
      console.error(`Error ${response.status}: ${response.statusText}`);
    }
  } catch (err) {
    console.error('Fetch error:', err);
  }
}



function drawPrediction(data) {

    data = parseFloat(data);

    var m = $("#month").val().padStart(2, "0");
    var d = $("#day").val().padStart(2, "0");
    var h = $("#hour").val().padStart(2, "0");

    var mdh = m + d + h;

    // ONly display one prediction dot
    svg.selectAll("circle.current").remove();

    $("#display_temp").text(data.toFixed(2));

    svg.append("circle")
        .attr("class", "current")
        .attr("cx", function () {
            return x(mdh);
        })
        .attr("cy", function () {
            return y(data);
        })
        .attr("r", 2)
        .style("fill", "red");

}
/* Run the python script from OCADU server: 
https://ocadu.goodcodeclub.com//temperature/?path=bo.siu/temperature/main.py&input=071312 */

// D3 CODE FOR VISUALIZATIONS

var width = 300;
var height = 200;

var x = d3.scaleLinear()
    .domain([0, 123123])
    .range([20, width - 10])

var y = d3.scaleLinear()
    .domain([40, -40])
    .range([0, height - 20])

var svg = d3.select("#graph")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

svg.append("g")
    .call(d3.axisLeft(y))
    .attr("transform", "translate(30, 10)")

var href = "/csv/data.csv";


function drawDots(dot) {

    svg.append("circle")
        .attr("cx", function () {
            return x(dot.monthdayhour);
        })
        .attr("cy", function () {
            return y(dot.DegreeC);
        })
        .attr("r", 1)
        .style("fill", "orange");

}

d3.csv(href, drawDots);

var path = "main.py";
