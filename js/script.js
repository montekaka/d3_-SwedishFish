// var swedishFish = require("./swedishFish");
// var dataCleaning = require("./dataCleaning");
// var postRate = swedishFish.postRate;
// var prepareChartData = dataCleaning.prepareChartData;

// var bardata = [20, 30, 40, 15];
// Prepare Data to plot
var chartData = prepareChartData(postRate, 20); // we should allow user to choose bin from browser

var height = 400,
  width = 600,
  barWidth = width/Math.floor(chartData.length),
  barOffset = 5;

d3.select("#chart").append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('background', '#C9D7D6')
  .selectAll('rect').data(chartData)
  .enter().append('rect')
    .style('fill', '#C61C6F')
    .attr('width', barWidth)
    .attr('height', function(d){
      return d.value;
    })
  .attr('x', function(d, i){
    return i * (barWidth + barOffset);
  })
  .attr('y', function(d){
    return height - d.value;
  });
