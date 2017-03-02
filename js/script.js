//http://bl.ocks.org/phil-pedruco/88cb8a51cdce45f13c7e

// var swedishFish = require("./swedishFish");
// var dataCleaning = require("./dataCleaning");
// var postRate = swedishFish.postRate;
// var prepareChartData = dataCleaning.prepareChartData;

// var bardata = [20, 30, 40, 15];
// Prepare Data to plot
// start simulation
var dataset = [1,1,0,1,1,1,0,1,0,0]; // later on we should allow user to upload its own dataset
var nDraws = $('#nDraws').val();
var binsCount = 20; // we should allow user to choose bin from browser

var postRate = getSimulation(dataset, nDraws);
var chartData = prepareChartData(postRate, binsCount);

var margin = {top: 30, right: 30, bottom: 40, left: 50};

var height = 400 - margin.top - margin.bottom,
  width = 900 - margin.right - margin.left,
  barWidth = width/binsCount,
  barOffset = 2;

var colors = d3.scale.linear()
              .domain([0, binsCount * 1/3, binsCount * 2/3, binsCount])
            	.range(['#B58929','#C61C6F','#268BD2','#85992C']);

var tooltip = d3.select('body').append('div')
                .style('position','absolute')
                .style('padding','0 10px')
                .style('background','white')
                .style('opacity',0);

var myChart = d3.select("#chart").append('svg')
                .style('background','#E7E0CB')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .attr('transform', 'translate('+ margin.left +', '+ margin.top +')');

var settings = {
								margin: margin,
								height: height,
								width: width,
								barWidth: barWidth,
								barOffset: barOffset,
								colors: colors,
								tooltip: tooltip
							};

buildChart(chartData, myChart, settings);


$("#refresh").click(function(){
	console.log("refresh data");
	nDraws = $('#nDraws').val();
	if(nDraws > 100000){
		console.log("too many sample")
	} else {
		d3.selectAll('#chart rect').data(postRate).exit().remove();
	  postRate = getSimulation(dataset, nDraws);
	  chartData = prepareChartData(postRate, binsCount);
	  buildChart(chartData, myChart, settings);
	}

});
