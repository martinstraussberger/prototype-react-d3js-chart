import styles from '../styles.module.scss';

// Axis-SPO2
export const AxisBloodPressure = ({ yScale, innerWidth, tickOffsetLeft }) =>
  // linear scale uses ticks
  yScale.ticks().map((tickValue) => (
    <g
      key={tickValue}
      className={`${styles.tick} ${styles.__roseRed}`}
      transform={`translate(0, ${yScale(tickValue)})`}
    >
      <line x2={innerWidth} />
      <text x={tickOffsetLeft} dy='.32em'>
        {tickValue}
      </text>
    </g>
  ));
