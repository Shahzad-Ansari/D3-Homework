var svgWidth = 1040;
var svgHeight = 600;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;


var svg = d3.select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var plotParams = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


d3.csv("data.csv", function(inputData) {
  
  inputData.forEach(function(data) {
    data.poverty =+ data.poverty;
    data.obesity =+ data.obesity;
  });


  var xScale = d3.scaleLinear().range([0, width]);
  var yScale = d3.scaleLinear().range([height, 0]);
  var xAxis = d3.axisBottom(xScale);
  var yAxis = d3.axisLeft(yScale);

  xScale.domain([20, 45]);
  yScale.domain([5, 25]);


  plotParams.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

  plotParams.append("g")
    .call(yAxis);

  
  var circleParams = plotParams.selectAll("circle")
  .data(inputData)
  .enter()
  .append("circle")
  .attr("cx", d => xScale(d.obesity +1.5))
  .attr("cy", d => yScale(d.poverty +0.3))
  .attr("r", "20")
  .attr("fill", "red")
  .attr("opacity", .25)


 
  plotParams.append("text")
  .style("font-size", "10px")
  .selectAll("tspan")
  .data(inputData)
  .enter()
  .append("tspan")
      .attr("x", function(data) {
          return xScale(data.obesity +1.3);
      })
      .attr("y", function(data) {
          return yScale(data.poverty +.1);
      })
      .text(function(data) {
          return data.abbr
      });

  plotParams.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -30)
    .attr("x", -300)
    .text("obesity(%)");


  plotParams.append("text")
    .attr("transform", "translate( 400 , 555)")
    .text("In poverty (%)");
});
