import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import './styles.css';

class App extends React.Component {
  componentDidMount() {
    this.renderMultiChart();
  }
  render() {
    return (
      <div className='App'>
        <div id='chart' />
      </div>
    );
  }
  renderMultiChart() {
    var data = [
      {
        name: 'BlutdruckSys',
        values: [
          { date: new Date(2022, 3, 24, 1, 0), value: '100' },
          { date: new Date(2022, 3, 24, 2, 10), value: '110' },
          { date: new Date(2022, 3, 24, 3, 20), value: '145' },
          { date: new Date(2022, 3, 24, 4, 30), value: '241' },
          { date: new Date(2022, 3, 24, 5, 40), value: '101' },
          { date: new Date(2022, 3, 24, 6, 50), value: '90' },
          { date: new Date(2022, 3, 24, 7, 60), value: '85' },
          { date: new Date(2022, 3, 24, 8, 70), value: '55' },
          { date: new Date(2022, 3, 24, 9, 80), value: '31' },
          { date: new Date(2022, 3, 24, 10, 90), value: '141' },
        ],
      },
      {
        name: 'BlutdruckDia',
        values: [
          { date: new Date(2022, 3, 24, 1, 0), value: '80' },
          { date: new Date(2022, 3, 24, 2, 10), value: '100' },
          { date: new Date(2022, 3, 24, 3, 20), value: '125' },
          { date: new Date(2022, 3, 24, 4, 30), value: '201' },
          { date: new Date(2022, 3, 24, 5, 40), value: '91' },
          { date: new Date(2022, 3, 24, 6, 50), value: '82' },
          { date: new Date(2022, 3, 24, 7, 60), value: '80' },
          { date: new Date(2022, 3, 24, 8, 70), value: '50' },
          { date: new Date(2022, 3, 24, 9, 80), value: '21' },
          { date: new Date(2022, 3, 24, 10, 90), value: '11' },
        ],
      },
    ];

    var width = 960;
    var height = 500;
    var margin = 200;
    var duration = 250;

    var lineOpacity = '0.25';
    var lineOpacityHover = '0.85';
    var otherLinesOpacityHover = '0.1';
    var lineStroke = '1.5px';
    var lineStrokeHover = '2.5px';

    var circleOpacity = '0.85';
    var circleOpacityOnLineHover = '0.25';
    var circleRadius = 3;
    var circleRadiusHover = 6;

    /* Format Data */

    /* Scale */
    var xScale = d3
      .scaleTime()
      .domain(d3.extent(data[0].values, (d) => d.date))
      .range([0, width - margin]);

    var yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data[0].values, (d) => d.value * 1.4)])
      .range([height - margin, 0]);

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    /* Add SVG */
    var svg = d3
      .select('#chart')
      .append('svg')
      .attr('width', width + margin + 'px')
      .attr('height', height + margin + 'px')
      .append('g')
      .attr('transform', `translate(${margin}, ${margin})`);

    /* Add line into SVG */
    var line = d3
      .line()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.value));

    let lines = svg.append('g').attr('class', 'lines');

    lines
      .selectAll('.line-group')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'line-group')
      .on('mouseover', function (d, i) {
        svg
          .append('text')
          .attr('class', 'title-text')
          .style('fill', color(i))
          .text(d.name)
          .attr('text-anchor', 'middle')
          .attr('x', (width - margin) / 2)
          .attr('y', 5);
      })
      .on('mouseout', function (d) {
        svg.select('.title-text').remove();
      })
      .append('path')
      .attr('class', 'line')
      .attr('d', (d) => line(d.values))
      .style('stroke', (d, i) => color(i))
      .style('opacity', lineOpacity)
      .on('mouseover', function (d) {
        d3.selectAll('.line').style('opacity', otherLinesOpacityHover);
        d3.selectAll('.circle').style('opacity', circleOpacityOnLineHover);
        d3.select(this)
          .style('opacity', lineOpacityHover)
          .style('stroke-width', lineStrokeHover)
          .style('cursor', 'pointer');
      })
      .on('mouseout', function (d) {
        d3.selectAll('.line').style('opacity', lineOpacity);
        d3.selectAll('.circle').style('opacity', circleOpacity);
        d3.select(this).style('stroke-width', lineStroke).style('cursor', 'none');
      });

    /* Add circles in the line */
    lines
      .selectAll('circle-group')
      .data(data)
      .enter()
      .append('g')
      .style('fill', (d, i) => color(i))
      .selectAll('circle')
      .data((d) => d.values)
      .enter()
      .append('g')
      .attr('class', 'circle')
      .on('mouseover', function (d) {
        d3.select(this)
          .style('cursor', 'pointer')
          .append('text')
          .attr('class', 'text')
          .text(`${d.value}`)
          .attr('x', (d) => xScale(d.date) + 5)
          .attr('y', (d) => yScale(d.value) - 10);
      })
      .on('mouseout', function (d) {
        d3.select(this)
          .style('cursor', 'none')
          .transition()
          .duration(duration)
          .selectAll('.text')
          .remove();
      })
      .append('circle')
      .attr('cx', (d) => xScale(d.date))
      .attr('cy', (d) => yScale(d.value))
      .attr('r', circleRadius)
      .style('opacity', circleOpacity)
      .on('mouseover', function (d) {
        d3.select(this).transition().duration(duration).attr('r', circleRadiusHover);
      })
      .on('mouseout', function (d) {
        d3.select(this).transition().duration(duration).attr('r', circleRadius);
      });

    /* Add Axis into SVG */
    var xAxis = d3.axisBottom(xScale).ticks(5);
    var yAxis = d3.axisLeft(yScale).ticks(5);

    svg
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${height - margin})`)
      .call(xAxis);

    svg
      .append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text')
      .attr('x', width / 2)
      .attr('y', height / 2)
      .attr('y', 15)
      .attr('text-anchor', 'middle')
      .attr('fill', '#000')
      .text('Vitalwert-Grafik');
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
