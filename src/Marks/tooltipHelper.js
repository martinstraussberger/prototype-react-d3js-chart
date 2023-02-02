import styles from '../styles.module.scss';
import * as d3 from 'd3';

export const tooltipDiv = d3
  .select('body')
  .append('div')
  .attr('class', `${styles.tooltip}`)
  .style('opacity', 0);

export const formatTimeOnHover = d3.timeFormat('%H:%M');

export const circleRadius = 4;
export const circleRadiusHover = 8.5;
export const duration = 250;

export function onMouseOut() {
  d3.select(this).transition().duration(duration).attr('r', circleRadius);
  tooltipDiv.style('opacity', 0);
}
