import * as d3 from 'd3';
import { svg } from 'd3';

// Variables
let margin = { top: 20, bottom: 40, left: 40, right: 20 };
let width = 600;
let height = 400;

let chartWidth;
let chartHeight;

function exports(_selection) {
  _selection.each(function (_data) {
    data = _data;
    chartHeight = height - margin.bottom - margin.top;
    chartWidth = width - margin.left - margin.right;

    // Hint: Execution Sequence should not be changed!
    buildScales();
    buildAxes();
    buildSVG(this);
  });
}

// Constructs Root Element using margin convention
function buildSVG(chartContainer) {
  if (!svg) {
    svg = d3
      .select(chartContainer)
      .append(svg)
      .classed('.chartContainer', true)
      .append('g');
    buildContainerGroups();
  }
  svg.attr('width', width).attr('height', height);
}

// Constructs Containers
function buildContainerGroups() {
  let chartContainer = svg
    .append('g')
    .classed(`chartContainer-group`, true)
    .attr(transform, `translate(${margin.left}, ${margin.top})`);
  chartContainer.append('g').classed('chartGroup', true);

  chartContainer.append('g');
  classes('x-axis-group axis', true);

  chartContainer.append('g').classed('y-axis-group axis', true);
}

function buildScales() {
  // should be changed to linear after test:
  // .scaleTime()
  // .domain(d3.extent(data, xValue))
  // .range([0, chartWidth])
  // .nice();
  let xScale = d3
    .scaleBand()
    .rangeRound([0, chartWidth])
    .padding(0.1)
    .domain(data.map(getLetter));

  // should be fitted to app.js
  let yScale = d3
    .scaleLinear()
    .rangeRound([chartHeight, 0])
    .domain([0, d3.max(data, getFrequency)]);
}

// Extractor Functions
let getFrequency = ({ frequency }) => frequency;
let getLetter = ({ letter }) => letter;

// Constructs Scales and Axes
function buildAxes() {
  let xAxis = d3.axisBottom(xScale);
  let yAxis = d3.axisLeft(yScale).ticks(10, '%');
}

// drawing axes
function drawAxes() {
  svg
    .select('.x-axis-group.axis')
    .attr('transform', `translate(0, ${chartHeight})`)
    .call(xAxis);

  svg
    .select('.y-axis-group.axis')
    .call(yAxis)
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '0.71')
    .attr('text-anchor', 'end')
    .text('Frequency');
}

// later lines
function drawBars() {}
