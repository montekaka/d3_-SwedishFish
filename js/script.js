//http://bl.ocks.org/phil-pedruco/88cb8a51cdce45f13c7e

// var swedishFish = require("./swedishFish");
// var dataCleaning = require("./dataCleaning");
// var postRate = swedishFish.postRate;
// var prepareChartData = dataCleaning.prepareChartData;

// var bardata = [20, 30, 40, 15];
// Prepare Data to plot
var binsCount = 100;
var chartData = prepareChartData(postRate, binsCount); // we should allow user to choose bin from browser

var margin = {top: 30, right: 30, bottom: 40, left: 50};

var height = 400 - margin.top - margin.bottom,
  width = 900 - margin.right - margin.left,
  barWidth = width/binsCount,
  barOffset = 2;

var tempColor;

var maxDataValue = d3.max(chartData,
    function(d){
      return d.value;
    });


var colors = d3.scale.linear()
              .domain([0, binsCount * 1/3, binsCount * 2/3, binsCount])
              .range(['#B58929','#C61C6F','#268BD2','#85992C']);

var yScale = d3.scale.linear()
              .domain([0,maxDataValue])
              .range([0, height]);

var xScale = d3.scale.ordinal()
              .domain(d3.range(0, binsCount))
              .rangeBands([0, width]);

var tooltip = d3.select('body').append('div')
                .style('position','absolute')
                .style('padding','0 10px')
                .style('background','white')
                .style('opacity',0)

var myChart =    d3.select("#chart").append('svg')
                  .style('background','#E7E0CB')
                  .attr('width', width + margin.left + margin.right)
                  .attr('height', height + margin.top + margin.bottom)
                  .attr('transform', 'translate('+ margin.left +', '+ margin.top +')')
                  .selectAll('rect').data(chartData)
                  .enter().append('rect')
                    .style('fill', function(d, i){
                      return colors(i);
                    })
                    .attr('width', xScale.rangeBand())
                    .attr('x', function(d, i){
                    return xScale(i);
                    })
                    .attr('height', 0)
                    .attr('y', height)
                  .on('mouseover', function(d){
                    tooltip.transition()
                          .style('opacity', 0.9);

                    tooltip.html(d.range)
                          .style('left', (d3.event.pageX - 35)+'px')
                          .style('top',(d3.event.pageY - 30)+'px');

                    tempColor = this.style.fill;
                    d3.select(this)
                      .style('opacity',0.5)
                      .style('fill','yellow')
                  })
                  .on('mouseout', function(d){
                    d3.select(this)
                      .style('opacity',1)
                      .style('fill',tempColor)
                  });

myChart.transition()
      .attr('height', function(d){
        return yScale(d.value);
      })
      .attr('y', function(d){
      return height - yScale(d.value);
      })
      .delay(function(d, i){
        return i * 10;
      })
      .duration(1000)
      .ease('elastic');
