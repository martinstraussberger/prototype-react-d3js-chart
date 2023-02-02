// import React, { useEffect, useRef } from 'react';
// import * as d3 from 'd3';

// import styles from '../styles.module.css';

// const circleRadius = 4;
// const circleRadiusHover = 8.5;
// const duration = 250;
// const color = '#ccc';
// const absolute = 'absolute';
// const width = '120px';

// const formatTimeOnHover = d3.timeFormat('%e %B');

// export const MarksTemperatur = ({ data, xScale, yScale, xValue, yValue, onHover }) => {
//   const ref = useRef();
//   const showHoverData = data.map((d) => {
//     return d.temperature;
//   });
//   const div = d3
//     .select('#dataPointTemperature')
//     .append('div')
//     .data(showHoverData)
//     // .enter()
//     .attr('class', 'tooltip')
//     .style('opacity', 0);

//   useEffect(() => {
//     //mouseover
//     d3.selectAll('#dataPointTemperature').on('mouseover', function (d) {
//       d3.select(this).transition().duration(duration).attr('r', circleRadiusHover);

//       // display div
//       div.transition().duration(duration).style('opacity', 1);
//       div
//         .html(showHoverData)
//         .style('left', d3.select(ref.current).attr('cx') + 50 + 'px')
//         .style('top', d3.select(ref.current).attr('cy') - 15 + 'px');
//       console.log(ref.current.showHoverData);
//     });

//     //mouseout
//     d3.selectAll('circle').on('mouseout', function (d) {
//       d3.select(this).transition().duration(duration).attr('r', circleRadius);
//       div.transition().duration(duration).style('opacity', 0);
//     });
//   }, []);

//   return (
//     <g className={`${styles.drawLine} ${styles.__temperatureBlue} ${styles.cursor}`}>
//       <>
//         <path
//           fill='none'
//           d={d3
//             .line()
//             .x((d) => xScale(xValue(d)))
//             .y((d) => yScale(yValue(d)))
//             .curve(d3.curveNatural)(data)}
//         />
//         {data.map((d) => (
//           <circle
//             id='dataPointTemperature'
//             cx={xScale(xValue(d))}
//             cy={yScale(yValue(d))}
//             r={circleRadius}
//             ref={ref}
//             value={d.temperature}
//             //onMouseEnter returned obj array of temperature
//             // onMouseEnter={() => {
//             //   onHover(d.temperature);
//             // }}
//           >
//             <title>{d.temperature}°C</title>
//           </circle>
//         ))}
//       </>
//     </g>
//   );
// };
