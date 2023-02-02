import React, { useLayoutEffect, useRef } from 'react';
import * as d3 from 'd3';
import  from './LineChart.module.css';

const LineChart = () => {
  const vitalLineChart = useRef();

  useLayoutEffect(() => {
    const data = [
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

    const margin = { top: 20, right: 30, bottom: 30, left: 30 };
    const width =
      parseInt(d3.select('#vitalChart').style('width')) - margin.left - margin.right;
    const height =
      parseInt(d3.select('#vitalChart').style('height')) - margin.top - margin.bottom;

    const duration = 250;
    const lineOpacity = '0.25';
    const lineOpacityHover = '0.85';
    const otherLinesOpacityHover = '0.1';
    const lineStroke = '1.5px';
    const lineStrokeHover = '2.5px';

    const circleOpacity = '0.85';
    const circleOpacityOnLineHover = '0.25';
    const circleRadius = 3;
    const circleRadiusHover = 6;

    // x axis scale
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data[0].values, (d) => d.date))
      .range([0, width - margin]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data[0].values, (d) => d.value * 1.4)])
      .range([height - margin, 0]);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Set up chart
    const svg = d3
      .select(vitalLineChart.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    /* Add line into SVG */
    const line = d3
      .line()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.price));

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
          .text(`${d.price}`)
          .attr('x', (d) => xScale(d.date) + 5)
          .attr('y', (d) => yScale(d.price) - 10);
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
      .attr('cy', (d) => yScale(d.price))
      .attr('r', circleRadius)
      .style('opacity', circleOpacity)
      .on('mouseover', function (d) {
        d3.select(this).transition().duration(duration).attr('r', circleRadiusHover);
      })
      .on('mouseout', function (d) {
        d3.select(this).transition().duration(duration).attr('r', circleRadius);
      });

    /* Add Axis into SVG */
    const xAxis = d3.axisBottom(xScale).ticks(5);
    const yAxis = d3.axisLeft(yScale).ticks(5);

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

    // Draw line
    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'orange')
      .attr('stroke-width', 3)
      .attr(
        'd',
        d3
          .line()
          .x(function (d) {
            return xScale(d.date);
          })
          .y(function (d) {
            return yScale(d.value);
          })
      );

    // Add title
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', margin.top / 5)
      .attr('text-anchor', 'middle')
      .attr('font-size', '16px')
      .attr('fill', '#0000030')
      .text('Vitalwert-Grafik');
  });

  return (
    <div id='vitalChart' className={styles.vitalLineChart}>
      <svg className={styles.svg} ref={vitalLineChart}></svg>
    </div>
  );
};

export default LineChart;

// LINE CHART WORKING
// import React, { useLayoutEffect, useRef } from 'react';
// import * as d3 from 'd3';
// import styles from './LineChart.module.css';

// const LineChart = () => {
//   const vitalLineChart = useRef();

//   // const parseDate = d3.timeParse('%Y-%m-%d');

//   useLayoutEffect(() => {
//     const data = [
//       { date: new Date(2022, 3, 24), value: 120 },
//       { date: new Date(2022, 3, 25), value: 150 },
//       { date: new Date(2022, 3, 26), value: 98 },
//       { date: new Date(2022, 3, 27), value: 105 },
//       { date: new Date(2022, 3, 30), value: 100 },
//       { date: new Date(2022, 4, 1), value: 108 },
//     ];

//     const margin = { top: 20, right: 30, bottom: 30, left: 30 };
//     const width =
//       parseInt(d3.select('#vitalChart').style('width')) - margin.left - margin.right;
//     const height =
//       parseInt(d3.select('#vitalChart').style('height')) - margin.top - margin.bottom;

//     // Set up chart
//     const svg = d3
//       .select(vitalLineChart.current)
//       .attr('width', width + margin.left + margin.right)
//       .attr('height', height + margin.top + margin.bottom)
//       .append('g')
//       .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

//     // x axis scale
//     const xScale = d3
//       .scaleTime()
//       .domain(
//         d3.extent(data, function (d) {
//           return d.date;
//         })
//       )
//       .range([0, width]);

//     svg
//       .append('g')
//       .attr('transform', 'translate(0,' + height + ')')
//       .call(d3.axisBottom(xScale));

//     // Get the max value of counts
//     const max = d3.max(data, function (d) {
//       return d.value;
//     });

//     // y axis scale
//     const yScale = d3.scaleLinear().domain([0, max]).range([height, 0]);

//     svg.append('g').call(d3.axisLeft(yScale));

//     // Draw line
//     svg
//       .append('path')
//       .datum(data)
//       .attr('fill', 'none')
//       .attr('stroke', 'orange')
//       .attr('stroke-width', 2)
//       .attr(
//         'd',
//         d3
//           .line()
//           .x(function (d) {
//             return xScale(d.date);
//           })
//           .y(function (d) {
//             return yScale(d.value);
//           })
//       )
//       .on('mouseover', function (d, i) {
//         d3.select(this).transition().duration('50').attr('opacity', '.85');
//       });

//     // Add title
//     svg
//       .append('text')
//       .attr('x', width / 2)
//       .attr('y', margin.top / 5)
//       .attr('text-anchor', 'middle')
//       .attr('font-size', '16px')
//       .attr('fill', '#0000030')
//       .text('Vitalwert-Grafik');
//   });

//   return (
//     <div id='vitalChart' className={styles.vitalChartD3}>
//       <svg className={styles.svg} ref={vitalLineChart}></svg>
//     </div>
//   );
// };

// export default LineChart;
