import styles from '../styles.module.scss';

// Axis-SPO2
export const AxisTemperature = ({ yScale, innerWidth, tickOffsetRight }) =>
  // linear scale uses ticks
  yScale.ticks().map((tickValue) => (
    <g
      key={tickValue}
      className={`${styles.tick} ${styles.__temperatureBlue}`}
      transform={`translate(0, ${yScale(tickValue)})`}
    >
      <line x2={innerWidth} />
      <text x={tickOffsetRight} dy='.32em'>
        {tickValue}
      </text>
    </g>
  ));
