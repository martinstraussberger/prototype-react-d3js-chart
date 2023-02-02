import React, { useEffect } from 'react';
import * as d3 from 'd3';

// import local dependencies
import styles from '../styles.module.scss';
import {
  tooltipDiv,
  formatTimeOnHover,
  onMouseOut,
  duration,
  circleRadius,
  circleRadiusHover,
} from './tooltipHelper';

const color = '#f69191';
const displayTime = '<b>Uhrzeit: </b> ';
const displayTemp = '<b>Blutdruck: </b>';

export const MarksBloodPressure = ({ data, xScale, yScale, xValue, yValue }) => {
  const drawLine = d3
    .line()
    .x((d) => xScale(xValue(d)))
    .y((d) => yScale(yValue(d)))
    .curve(d3.curveNatural)(data);

  const showHoverDataX = (d) => {
    return xScale(d.timestamp);
  };

  const showHoverDataY = (d) => {
    return yScale(d.vitalValueSys);
  };

  function onMouseOver(event, d) {
    d3.select(this).transition().duration(duration).attr('r', circleRadiusHover);

    tooltipDiv

      .html(
        displayTime +
          formatTimeOnHover(d.timestamp) +
          '<br/>' +
          displayTemp +
          d.vitalValueSys +
          'mmHg'
      )
      .style('left', event.pageX + 15 + 'px')
      .style('top', event.pageY - 30 + 'px')
      .style('opacity', 1);
  }

  onMouseOut();

  useEffect(() => {
    d3.select('#axis__marks__group')
      .selectAll('dot')
      .data(data)
      .enter()
      .append('circle')
      .style('fill', color)
      .attr('cursor', 'pointer')
      .attr('r', circleRadius)
      .attr('cx', showHoverDataX)
      .attr('cy', showHoverDataY)
      .on('mouseover', onMouseOver)
      .on('mouseout', onMouseOut);
  }, [data]);

  return (
    <g className={`${styles.drawLine} ${styles.__bloodPressure} ${styles.cursor}`}>
      <>
        <path fill='none' d={drawLine} />
      </>
    </g>
  );
};

// Typescript Version

// type dataParameter = {
//   timestamp: Date;
//   vitalValueSys: number;
// };

// const color = '#f69191';
// const displayTime = '<b>Uhrzeit: </b> ';
// const displayTemp = '<b>Blutdruck: </b>';

// export const MarksBloodPressure = ({ data, xScale, yScale, xValue, yValue }: any) => {
//   const drawLine = d3
//     .line()
//     .x((d) => xScale(xValue(d)))
//     .y((d) => yScale(yValue(d)))
//     .curve(d3.curveNatural)(data);

//   const showHoverDataX = (d: dataParameter) => xScale(d.timestamp);

//   const showHoverDataY = (d: dataParameter) => yScale(d.vitalValueSys);
//   // const showHoverDataX = (d: any) => {
//   //   return xScale(d.timestamp);
//   // };

//   // const showHoverDataY = (d: any) => {
//   //   return yScale(d.vitalValueSys);
//   // };

//   function onMouseOver(this: any, event: any, d: any) {
//     d3.select(this).transition().duration(duration).attr('r', circleRadiusHover);

//     tooltipDiv
//       .html(
//         displayTime +
//           formatTimeOnHover(d.timestamp) +
//           '<br/>' +
//           displayTemp +
//           d.vitalValueSys +
//           'mmHg'
//       )
//       .style('left', event.pageX + 15 + 'px')
//       .style('top', event.pageY - 30 + 'px')
//       .style('opacity', 1);
//   }

//   onMouseOut();

//   useEffect(() => {
//     d3.select('#axis__marks__group')
//       .selectAll('dot')
//       .data(data)
//       .enter()
//       .append('circle')
//       .style('fill', color)
//       .attr('cursor', 'pointer')
//       .attr('r', circleRadius)
//       .attr('cx', showHoverDataX)
//       .attr('cy', showHoverDataY)
//       .on('mouseover', onMouseOver)
//       .on('mouseout', onMouseOut);
//   }, [data]);

//   return (
//     <g className={`${styles.drawLine} ${styles.__bloodPressure} ${styles.cursor}`}>
//       <>
//         <path fill='none' d={drawLine!} />
//       </>
//     </g>
//   );
// };
