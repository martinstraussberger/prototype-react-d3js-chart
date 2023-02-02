import React, { useRef } from 'react';
import * as d3 from 'd3';

// dependencies
import { useData, vitalDataJsonBloodPressure, vitalDataJsonSPO2 } from './data/useData';
import { AxisBottom } from './Axis/AxisBottom';
import { AxisBloodPressure } from './Axis/AxisBloodPressure';
import { AxisSPO2 } from './Axis/AxisSPO2.js';
import { AxisTemperature } from './Axis/AxisTemperature';
import { MarksTemperatur } from './Marks/MarksTemperatur';
import { MarksSPO2 } from './Marks/MarksSPO2';
import { MarksBloodPressure } from './Marks/MarksBloodPressure';
import { formatTimeOnHover } from './Marks/tooltipHelper';
import { RenderModal } from './Modal/modalComponent';

import styles from './styles.module.scss';

const dimensions = {
  width: 1080,
  height: 550,
};

const margin = { top: 0, bottom: 120, right: 70, left: 40 };

const xValue = (d) => d.timestamp;
const yValueTemperature = (d) => d.temperature;
const yValueSPO2 = (d) => d.vitalValue;
const yValueBloodPressure = (d) => d.vitalValueSys;

export const App = () => {
  const btnRef = useRef(null);
  const data = useData();
  const vitalDataSPO2 = vitalDataJsonSPO2();
  const vitalDataBloodPressure = vitalDataJsonBloodPressure();

  if (!data) {
    return <pre>Loading...</pre>;
  }

  const innerHeight = dimensions.height - margin.top - margin.bottom;
  const innerWidth = dimensions.width - margin.left - margin.right;

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, xValue))
    .rangeRound([0, innerWidth])
    .nice();

  const yScaleBloodPressure = d3
    .scaleLinear()
    .domain(d3.extent(vitalDataBloodPressure, yValueBloodPressure))
    .range([innerHeight, 0])
    .nice();

  const yScaleSPO2 = d3
    .scaleLinear()
    .domain(d3.extent(vitalDataSPO2, yValueSPO2))
    .range([innerHeight, 0])
    .nice();

  const yScaleTemperature = d3
    .scaleLinear()
    .domain(d3.extent(data, yValueTemperature))
    .range([innerHeight, 0])
    .nice();

  return (
    <>
      <div className={styles.chartContainer}>
        <svg
          width={dimensions.width}
          height={dimensions.height}
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        >
          <g
            id='axis__marks__group'
            transform={`translate(${margin.left}, ${margin.right})`}
          >
            <AxisBottom
              xScale={xScale}
              innerHeight={innerHeight}
              tickFormat={formatTimeOnHover}
              tickOffset={25}
              key={1}
            />

            <AxisBloodPressure
              yScale={yScaleBloodPressure}
              innerWidth={innerWidth}
              tickOffsetLeft={-40}
              key={2}
            />

            <AxisSPO2
              yScale={yScaleSPO2}
              innerWidth={innerWidth}
              tickOffsetRight={innerWidth + 12}
              text-align='right'
              key={3}
            />

            <AxisTemperature
              yScale={yScaleTemperature}
              innerWidth={innerWidth}
              tickOffsetRight={innerWidth + 53}
              key={4}
            />

            <MarksSPO2
              data={vitalDataSPO2}
              xScale={xScale}
              yScale={yScaleSPO2}
              xValue={xValue}
              yValue={yValueSPO2}
              circleRadius={4}
              key={5}
            />

            <MarksBloodPressure
              data={vitalDataBloodPressure}
              xScale={xScale}
              yScale={yScaleBloodPressure}
              xValue={xValue}
              yValue={yValueBloodPressure}
              circleRadius={4}
              key={6}
            />

            <MarksTemperatur
              data={data}
              xScale={xScale}
              xValue={xValue}
              yScale={yScaleTemperature}
              yValue={yValueTemperature}
              circleRadius={4.5}
              key={7}
            />
          </g>
        </svg>
      </div>
      <RenderModal />
    </>
  );
};
