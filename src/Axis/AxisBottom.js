import styles from '../styles.module.scss';

export const AxisBottom = ({ xScale, innerHeight, tickFormat, tickOffset = 3 }) =>
  xScale.ticks().map((tickValue) => (
    <g
      key={tickValue}
      className={`${styles.tick__fontSize__sm} ${styles.__black}`}
      transform={`translate(${xScale(tickValue)})`}
    >
      <line x1={0} y1={0} x2={0} y2={innerHeight} stroke='#C0C0BB' />
      <text dy='.71em' style={{ textAnchor: 'middle' }} y={innerHeight + tickOffset}>
        {tickFormat(tickValue)}
      </text>
    </g>
  ));
