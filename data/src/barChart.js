			
			var margin = {top: 50 , right: 20, bottom: 100, left: 40},
		    width = 720 - margin.left - margin.right,
		    height = 500 - margin.top - margin.bottom

		    var x = d3.scale.ordinal()
			    .rangeRoundBands([0, width], .1);

			var y = d3.scale.linear()
			    .range([height, 0]);

			var xAxis = d3.svg.axis()
			    .scale(x)
			    .orient("bottom");


			var yAxis = d3.svg.axis()
			    .scale(y)
			    .orient("left")


			// var tip = d3.tip()
			//   .attr('class', 'd3-tip')
			//   .offset([-10, 0])
			//   .html(function(d) {
			//     return "<strong>Total Megawatts installed:</strong>  <span style='color:green'>" + d.total_megawatts_installed + "</span>" + " " +
			//     "<strong>Founded:</strong>  <span style='color:green'>" + d.year_founded + "</span>";
			//   })

			// svg.call(tip);
		
		function drawBarChart(error, data) {
		
			  x.domain(data.map(function(d) { return d.company; }));
			  y.domain([0, d3.max(data, function(d) { return d.total_megawatts_installed; })]);

			  svg.append("g")
			      .attr("class", "x axis")
			      .attr("transform", "translate(0," + height + ")")
			      .call(xAxis)
			      .selectAll("text")  
			            .style("text-anchor", "end")
			            .attr("dx", "-.8em")
			            .attr("dy", ".15em")
			            .attr("transform", "rotate(-30)")
			            .style("font-weight","bold");


			  svg.append("g")
			      .attr("class", "y axis")
			      .call(yAxis)

			  svg.selectAll(".bar")
			      .data(data)
			    .enter().append("rect")
			      .attr("class", "bar")
			      .attr("x", function(d) { return x(d.company); })
			      .attr("width", x.rangeBand())
			      .attr("y", function(d) { return y(d.total_megawatts_installed); })
			      .attr("height", function(d) { return height - y(d.total_megawatts_installed); })
			      .style("fill", function(d) {if (d.company === "SolarCity") {return "green";}
			  									else {return "orange";}})
			      .on('mouseover', tip.show)
			      .on('mouseout', tip.hide)

		};