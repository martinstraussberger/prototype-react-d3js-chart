import React, { useEffect, useRef } from 'react';
import { scaleLinear, scaleBand } from 'd3-scale';
import { max } from 'd3-array';
import { format } from 'd3-format';
import { axisBottom, axisLeft } from 'd3-axis';
import { select } from 'd3-selection';

const width = 960;
const height = 500;
const margin = { top: 20, right: 40, bottom: 20, left: 80 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

export const App = () => {
  const data = [
    {
      vitalType: 'Blutdruck',
      vitalValue: 80,
      timestamp: '2022-03-20T22:00:00.000Z',
    },
    {
      vitalType: 'Blutdruck',
      vitalValue: 120,
      timestamp: '2022-03-20T23:00:00.000Z',
    },
    {
      vitalType: 'Herzfrequenz',
      vitalValue: 60,
      timestamp: '2022-03-20T24:00:00.000Z',
    },
    {
      vitalType: 'Herzfrequenz',
      vitalValue: 65,
      timestamp: '2022-03-20T25:00:00.000Z',
    },
    {
      vitalType: 'SPO2',
      vitalValue: 98,
      timestamp: '2022-03-20T21:00:00.000Z',
    },
  ];
  const svg = useRef(null);
  useEffect(() => {
    renderBar(data);
  }, [data]);
  const renderBar = (data) => {
    const xValue = (d) => d.timestamp;
    const yValue = (d) => d.vitalType;

    const xScale = scaleLinear()
      .domain([0, max(data, xValue)])
      .range([0, innerWidth]);

    const yScale = scaleBand()
      .domain(data.map(yValue))
      .range([0, innerHeight])
      .padding(0.1);

    const g = select(svg.current)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const xAxisTickFormat = (number) => format('.3s')(number).replace('G', 'B');

    const xAxis = axisBottom(xScale).tickFormat(xAxisTickFormat);

    g.append('g').call(axisLeft(yScale));
    g.append('g').call(xAxis).attr('transform', `translate(0,${innerHeight})`);

    g.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('y', (d) => yScale(yValue(d)))
      .attr('width', (d) => xScale(xValue(d)))
      .attr('height', yScale.bandwidth())
      .attr('rx', 3);
  };
  return <svg height={height} width={width} ref={svg} style={{ fill: 'steelblue' }} />;
};

// ! -------------------------------- Tooltip Test -------------------------------- !

// Tooltips
// const tooltipDiv = d3
//   .select('.chartContainer')
//   .append('div')
//   .style('visibility', 'hidden')
//   .style('position', 'absolute')
//   .style('background-color', 'red');

// const colors = d3.scaleLinear(['black', 'red', 'purple', 'blue']);

// const hoverTooltip = d3
//   .select('.chartContainer')
//   .append('g')
//   .selectAll('path')
//   .data(vitalDataSPO2)
//   .join('path')
//   .attr('d', d3.line)
//   .attr('fill', (d, i) => colors(i))
//   .attr('stroke', 'white')
//   .on('mouseover', (e, d) => {
//     console.log(e);
//     console.log(d);

//     tooltipDiv.style('visibility', 'visible').text(`${d.vitalDataSPO2}`);
//   })
//   .on('mousemove', (e, d) => {
//     tooltipDiv.style('top', e.pageY - 50 + 'px').style('left', e.pageX - 50 + 'px');
//   })
//   .on('mouseout', () => {
//     tooltipDiv('visibility', 'hidden');
//   });

// const [activeRow, setActiveRow] = useState();

// ! -------------------------------- Axis Left Old -------------------------------- !
// import styles from './styles.module.css';

// export const AxisLeft = ({ yScale, innerWidth, tickOffsetLeft }) =>
//   // linear scale uses ticks
//   yScale.ticks().map((tickValue) => (
//     <g
//       className={`${styles.tick} ${styles.__black}`}
//       transform={`translate(0, ${yScale(tickValue)})`}
//     >
//       <line x2={innerWidth} />
//       <text x={-tickOffsetLeft} dy='.32em'>
//         {tickValue}
//       </text>
//     </g>
//   ));

// ! -------------------------------- App.js with AxisLabels(Blutdruck, etc.) -------------------------------- !
// import React from 'react';
// import ReactDOM from 'react-dom';
// import * as d3 from 'd3';

// // dependencies
// import { useData, vitalDataJsonBloodPressure, vitalDataJsonSPO2 } from './data/useData';
// import { AxisBottom } from './Axis/AxisBottom';
// import { AxisBloodPressure } from './Axis/AxisBloodPressure';
// import { AxisSPO2 } from './Axis/AxisSPO2.js';
// import { AxisTemperature } from './Axis/AxisTemperature';
// import { MarksTemperatur } from './Marks/MarksTemperatur';
// import { MarksSPO2 } from './Marks/MarksSPO2';
// import { MarksBloodPressure } from './Marks/MarksBloodPressure';

// import styles from './styles.module.css';

// const width = 1080;
// const height = 550;
// const margin = { top: 0, right: 70, bottom: 120, left: 40 };
// // const xAxisLabelOffset = 60;
// // const yAxisLabelOffset = 50;

// const xValue = (d) => d.timestamp;
// // const xAxisLabel = 'Zeit';

// const yValue = (d) => d.temperature;
// // const yAxisLabel = 'Herzfrequenz';

// const yValueSPO2 = (d) => d.vitalValue;
// const yValueBloodPressure = (d) => d.vitalValue;

// export const App = () => {
//   const data = useData();
//   const vitalDataSPO2 = vitalDataJsonSPO2();
//   const vitalDataBloodPressure = vitalDataJsonBloodPressure();

//   // Date setup für json Data of vital
//   // var date = new Date('Thu Mar 10 2022 16:28:57 GMT+0100');
//   // date.toISOString();
//   // console.log(date);

//   if (!data) {
//     return <pre>Loading...</pre>;
//   }

//   const innerHeight = height - margin.top - margin.bottom;
//   const innerWidth = width - margin.left - margin.right;

//   const xScale = d3
//     .scaleTime()
//     .domain(d3.extent(data, xValue))
//     .range([0, innerWidth])
//     // takes care of the
//     .nice();

//   const yScaleBlutdruckAndHerzfrequenz = d3
//     .scaleLinear()
//     .domain(d3.extent(data, yValue))
//     // temperature range goes from innerHeight to zero
//     .range([innerHeight, 0])
//     .nice();

//   const yScaleBloodPressure = d3
//     .scaleLinear()
//     .domain(d3.extent(vitalDataBloodPressure, yValueBloodPressure))
//     // temperature range goes from innerHeight to zero
//     .range([innerHeight, 0])
//     .nice();

//   const yScaleSPO2 = d3
//     .scaleLinear()
//     .domain(d3.extent(vitalDataSPO2, yValueSPO2))
//     // temperature range goes from innerHeight to zero
//     .range([innerHeight, 0])
//     .nice();

//   const yScaleTemperature = d3
//     .scaleLinear()
//     .domain(d3.extent(data, yValue))
//     // temperature range goes from innerHeight to zero
//     .range([innerHeight, 0])
//     .nice();

//   const xAxisTickFormat = d3.timeFormat('%d:%M');

//   return (
//     <div className={styles.chartContainer}>
//       <svg
//         width={width}
//         height={height}
//         viewBox={`0 0 ${width} ${height}`}
//         preserveAspectRatio='xMidYMid meet'
//       >
//         <g transform={`translate(${margin.left}, ${margin.right})`}>
//           <AxisBottom
//             xScale={xScale}
//             innerHeight={innerHeight}
//             tickFormat={xAxisTickFormat}
//             tickOffset={25}
//           />
//           {/* <text
//             className={styles.axisLabel}
//             textAnchor='middle'
//             transform={`translate(${-yAxisLabelOffset},
//             ${innerHeight / 2}) rotate(-90) `}
//           >
//             {yAxisLabel}
//           </text>
//           <text
//             className={styles.axisLabel}
//             textAnchor='middle'
//             transform={`translate(${-yAxisLabelOffset},
//             ${innerHeight / 2}) rotate(-90) `}
//           >
//             {yAxisLabel}
//           </text> */}
//           {/* <AxisLeft
//             yScale={yScaleBlutdruckAndHerzfrequenz}
//             innerWidth={innerWidth}
//             tickOffsetLeft={35}
//           /> */}

//           <AxisBloodPressure
//             yScale={yScaleBloodPressure}
//             innerWidth={innerWidth}
//             tickOffsetLeft={-40}
//           />

//           <AxisSPO2
//             yScale={yScaleSPO2}
//             innerWidth={innerWidth}
//             tickOffsetRight={innerWidth + 12}
//           />

//           <AxisTemperature
//             yScale={yScaleTemperature}
//             innerWidth={innerWidth}
//             tickOffsetRight={innerWidth + 53}
//           />
//           {/* <text
//             className={styles.axisLabel}
//             x={innerWidth / 2}
//             y={innerHeight + xAxisLabelOffset}
//             textAnchor='middle'
//           >
//             {xAxisLabel}
//           </text> */}
//           <MarksTemperatur
//             data={data}
//             xScale={xScale}
//             yScale={yScaleBlutdruckAndHerzfrequenz}
//             xValue={xValue}
//             yValue={yValue}
//             tooltipFormat={xAxisTickFormat}
//             circleRadius={3}
//           />
//           <MarksSPO2
//             data={vitalDataSPO2}
//             xScale={xScale}
//             yScale={yScaleSPO2}
//             xValue={xValue}
//             yValue={yValueSPO2}
//             tooltipFormat={xAxisTickFormat}
//             circleRadius={4}
//           />

//           <MarksBloodPressure
//             data={vitalDataBloodPressure}
//             xScale={xScale}
//             yScale={yScaleBloodPressure}
//             xValue={xValue}
//             yValue={yValueBloodPressure}
//             tooltipFormat={xAxisTickFormat}
//             circleRadius={4}
//           />
//         </g>
//       </svg>
//     </div>
//   );
// };
// const rootElement = document.getElementById('root');
// ReactDOM.render(<App />, rootElement);
