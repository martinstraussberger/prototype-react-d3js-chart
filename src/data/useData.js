import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

const csvUrl =
  'https://gist.githubusercontent.com/mskeegan01/6fd89be9af7f132d858e8089469891d4/raw/c3de716ca4758c228d3d865bb4ce03b1be0a0e7c/vitalDataInMinutes.csv';
// 'https://gist.githubusercontent.com/mskeegan01/01d9d36a67d1cb87bb4cd7aedf0e4a87/raw/2140aa24e27988ad337b763340e3cab91efdd897/vitalDataTest.csv';

export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const row = (d) => {
      // parsing string to number via = +d...
      d.temperature = +d.temperature;
      d.timestamp = new Date(d.timestamp);
      return d;
    };
    d3.csv(csvUrl, row).then(setData);
  }, []);

  return data;
};

export const vitalDataJsonBloodPressure = () => [
  {
    vitalValueSys: 300,
    vitalValueDia: 140,
    timestamp: new Date('2022-03-10T11:05:05.000Z'),
  },
  {
    vitalValueSys: 170,
    vitalValueDia: 130,
    timestamp: new Date('2022-03-10T11:40:10.000Z'),
  },
  {
    vitalValueSys: 145,
    vitalValueDia: 134,
    timestamp: new Date('2022-03-10T12:15:10.000Z'),
  },
  {
    vitalValueSys: 133,
    vitalValueDia: 120,
    timestamp: new Date('2022-03-10T13:00:10.000Z'),
  },
  {
    vitalValueSys: 120,
    vitalValueDia: 105,
    timestamp: new Date('2022-03-10T13:35:10.000Z'),
  },
  {
    vitalValueSys: 123,
    vitalValueDia: 120,
    timestamp: new Date('2022-03-10T13:40:10.000Z'),
  },
  {
    vitalValueSys: 130,
    vitalValueDia: 105,
    timestamp: new Date('2022-03-10T13:45:10.000Z'),
  },
];

export const vitalDataJsonSPO2 = () => [
  {
    vitalValue: 100,
    timestamp: new Date('2022-03-10T11:05:05.000Z'),
  },
  {
    vitalValue: 94,
    timestamp: new Date('2022-03-10T11:40:10.000Z'),
  },
  {
    vitalValue: 85,
    timestamp: new Date('2022-03-10T12:15:10.000Z'),
  },
  {
    vitalValue: 76,
    timestamp: new Date('2022-03-10T13:00:10.000Z'),
  },
  {
    vitalValue: 70,
    timestamp: new Date('2022-03-10T13:35:10.000Z'),
  },
];
