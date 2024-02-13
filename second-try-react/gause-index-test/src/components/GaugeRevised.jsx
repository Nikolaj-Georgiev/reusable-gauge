/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useState, useEffect } from 'react';

import classes from './GaugeRevised.module.css';

//in each value array there are the 3 sizes for small, medium and large;
const masterSizesData = [
  { name: '--center-content-width', value: [4, 6, 8] },
  { name: '--center-content-height', value: [4, 6, 8] },
  { name: '--center-content-top', value: [13, 12, 11] },
  { name: '--center-content-left', value: [13, 12, 11] },
  { name: '--center-content-font-size', value: [3.2, 5, 7] },
  { name: '--arrow-translate', value: [15, 10, 10] },
  { name: '--arrow-left-border', value: [0.4, 0.7, 1] },
  { name: '--arrow-right-border', value: [0.4, 0.7, 1] },
  { name: '--arrow-bottom-border', value: [0.8, 1.3, 1.8] },
  { name: '--colored-border-width', value: [6.5, 10, 13] },
  { name: '--colored-border-height', value: [6.5, 10, 13] },
  { name: '--colored-border-top', value: [11.8, 10, 8.5] },
  { name: '--colored-border-left', value: [11.8, 10, 8.5] },
  { name: '--colored-border-border', value: [0.32, 0.46, 0.64] },
  { name: '--gauge-width', value: [10, 15, 20] },
  { name: '--gauge-height', value: [10, 15, 20] },
  { name: '--gauge-top', value: [10, 7.5, 5] },
  { name: '--gauge-left', value: [10, 7.5, 5] },
  { name: '--center-cover-width', value: [9, 13.6, 18] },
  { name: '--center-cover-height', value: [9, 13.6, 18] },
  { name: '--center-cover-top', value: [10.5, 8.2, 6] },
  { name: '--center-cover-left', value: [10.5, 8.2, 6] },
];

export default function GaugeRevised({ value, size }) {
  const [indexValue, setIndexValue] = useState(0);

  useEffect(() => {
    const checkedValue = validateIndex(value);
    if (checkedValue || checkedValue === 0) {
      setIndexValue(checkedValue);
    }
    updateStyles(indexValue, size);
  }, [size, value, indexValue]);

  return (
    <>
      <div className={classes.container}>
        <div className={classes['center-content']}>
          <p>{indexValue}</p>
        </div>
        <div className={classes['center-cover']}></div>
        <div className={classes['colored-border']}>
          <div className={classes.arrow}></div>
        </div>
        <div className={classes.gauge}>
          {Array.from({ length: 11 }).map((_, i) => (
            <div
              key={i}
              className={`${classes.piece} ${classes[`piece--${i}`]}`}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
}

function updateStyles(index, size) {
  updateArrowPosition(index);
  updatePositionColors(index);

  updateSizeStyleProperties(masterSizesData, size);
}

////////////////////////////////////////////
// functions for changing the position of the arrow and background colors

function validateIndex(value) {
  if (Number.isInteger(value) && value >= 0 && value <= 10) {
    return value;
  }
  return null;
}

function dynamicUpdatePositionProperty(value) {
  const positions = [-82, -58, -32, -7, 19, 45, 70, 96, 122, 147, 172];
  document.documentElement.style.setProperty(
    '--arrow-position',
    `${positions[value]}deg`
  );
}

function updateArrowPosition(index) {
  dynamicUpdatePositionProperty(index);
}

function updatePositionColors(index) {
  document.documentElement.style.setProperty(
    '--colored-border-color',
    `var(--gauge-${index})`
  );
  document.documentElement.style.setProperty(
    '--arrow-color',
    `var(--gauge-${index})`
  );

  Array.from({ length: 11 }).forEach((_, i) =>
    document.documentElement.style.setProperty(
      `--piece-${i}-background`,
      `var(--gauge-${i === index ? i : `0${i}`})`
    )
  );
}

/////////////////////////////////////////////
//function for changing the size of the component UI

// this function can be omitted if you are sure that you are going to receive 'small', 'medium' or 'large'.
function formatSize(size) {
  const formattedSize = size?.toLowerCase().trim();
  if (!['small', 'medium', 'large'].includes(formattedSize)) {
    return null;
  }
  return formattedSize;
}

function updateSizeStyleProperties(cssPropsDataArray, size) {
  const formattedSize = formatSize(size);
  if (!formattedSize) {
    return null;
  }

  const currentSizeValue =
    formattedSize === 'small' ? 0 : formattedSize === 'medium' ? 1 : 2;

  cssPropsDataArray?.forEach((cssProp) => {
    document.documentElement.style.setProperty(
      `${cssProp?.name}`,
      `${
        !cssProp.name.includes('translate')
          ? `${cssProp?.value[currentSizeValue]}rem`
          : `${cssProp?.value[currentSizeValue]}%`
      }`
    );
  });
}
