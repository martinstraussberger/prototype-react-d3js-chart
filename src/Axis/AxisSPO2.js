import styles from '../styles.module.scss';

// Axis-SPO2
export const AxisSPO2 = ({ yScale, innerWidth, tickOffsetRight }) =>
  // linear scale uses ticks
  yScale.ticks().map((tickValue) => (
    <g
      key={tickValue}
      className={`${styles.tickSPO2} ${styles.__purple}`}
      transform={`translate(1, ${yScale(tickValue)})`}
    >
      <line x2={innerWidth} />
      <text x={tickOffsetRight} dy='.32em'>
        {tickValue}
      </text>
    </g>
  ));
