function buildChart(chartData, chart, settings){
  var tempColor;
  var margin 		= settings['margin'];
	var height 		= settings['height'];
	var width 		= settings['width'];
	var barWidth 	= settings['barWidth'];
	var barOffset = settings['barOffset'];
	var colors 		= settings['colors'];
	var tooltip 	= settings['tooltip'];

  var maxDataValue = d3.max(chartData,
      function(d){
        return d.value;
      });

  var yScale = d3.scale.linear()
                .domain([0,maxDataValue])
                .range([0, height]);

  var xScale = d3.scale.ordinal()
                .domain(d3.range(0, binsCount))
                .rangeBands([0, width]);

 chart.selectAll('rect').data(chartData)
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
        }).transition()
              .attr('height', function(d){
                return yScale(d.value);
              })
              .attr('y', function(d){
              return height - yScale(d.value);
              })
              .delay(function(d, i){
                return i * 100;
              })
              .duration(1000)
              .ease('elastic');
}
