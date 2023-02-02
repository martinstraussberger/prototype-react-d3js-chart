import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

import styles from '../styles.module.scss';
import '../styles.css';

import {
  tooltipDiv,
  formatTimeOnHover,
  onMouseOut,
  duration,
  circleRadius,
  circleRadiusHover,
} from './tooltipHelper';

const color = '#8155e0';
const displayTime = '<b>Uhrzeit: </b> ';
const displayTemp = '<b>SPO2: </b>';

export const MarksSPO2 = ({ data, xScale, yScale, xValue, yValue }) => {
  const drawLine = d3
    .line()
    .x((d) => xScale(xValue(d)))
    .y((d) => yScale(yValue(d)))
    .curve(d3.curveNatural)(data);

  function showHoverDataX(d) {
    return xScale(d.timestamp);
  }

  function showHoverDataY(d) {
    return yScale(d.vitalValue);
  }

  function onMouseOver(event, d) {
    d3.select(this).transition().duration(duration).attr('r', circleRadiusHover);

    tooltipDiv
      .html(
        displayTime +
          formatTimeOnHover(d.timestamp) +
          '<br/>' +
          displayTemp +
          d.vitalValue +
          '%'
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
      // .attr('cursor', 'pointer')
      .attr('r', circleRadius)
      .attr('cx', showHoverDataX)
      .attr('cy', showHoverDataY)
      .on('mouseover', onMouseOver)
      .on('mouseout', onMouseOut);
  }, [data]);

  return (
    <g className={`${styles.drawLine} ${styles.__spo2} ${styles.cursor}`}>
      <>
        <path fill='none' d={drawLine} />
      </>
    </g>
  );
};
