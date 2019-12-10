//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// Assignment 16 - D3 Challenge ////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////
///////////// Initialize SVG /////////////
//////////////////////////////////////////

// set parameters for SVG
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// create SVG wrapper and append a group to hold the chart 
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


//////////////////////////////////////////
///////// Functions for Elements /////////
//////////////////////////////////////////

// set initial param
var chosenXAxis = "in_poverty";

// function used for updating x-scale var upon click on axis label
function xScale(data, chosenXAxis) {
    // create scales
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(data, d => d[chosenXAxis]) * 0.8,
        d3.max(data, d => d[chosenXAxis]) * 1.2
      ])
      .range([0, width]);
  
    return xLinearScale;
  
  }
  
  // update xAxis var when label is clicked
  function renderAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);
  
    xAxis.transition()
      .duration(1000)
      .call(bottomAxis);
  
    return xAxis;
  }
  
  // update circles group with transitions
  function renderCircles(circlesGroup, newXScale, chosenXAxis) {
  
    circlesGroup.transition()
      .duration(1000)
      .attr("cx", d => newXScale(d[chosenXAxis]));
  
    return circlesGroup;
  }
  
  // update circles group with new tooltip
  function updateToolTip(chosenXAxis, circlesGroup) {
  
    if (chosenXAxis === "in_poverty") {
      var label = "In Poverty (%):";
    }
    else {
      var label = "Household Income (Median)";
    }
  
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(d => {
        return (`Test <hr>${d.poverty}<hr> ${d[chosenXAxis]}`);
      });
  
    circlesGroup.call(toolTip);

      // mouseover event - show tooltip
    circlesGroup.on("mouseover", function(data) {
      toolTip.show(data);
    })
      // onmouseout event - hide tooltip
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });
  
    return circlesGroup;
  }

