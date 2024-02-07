/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';

import classes from './Gauge.module.css';

export default function Gauge({ value, size }) {
  const [centerCoverSize, setCenterCoverSize] = useState('');
  const [indexValue, setIndexValue] = useState(0);

  useEffect(() => {
    const formattedSize = size?.toLowerCase().trim();
    if (['small', 'medium', 'large'].includes(formattedSize)) {
      setCenterCoverSize(formattedSize);
    }
    // else {
    //   console.error('Invalid size! Should be "small", "medium", or "large"!');
    // }

    if (Number.isInteger(value) && value >= 0 && value <= 10) {
      setIndexValue(value);
    }
    // else {
    //   console.error(
    //     'Invalid index: value should be a whole number in the range 0-10'
    //   );
    // }
    handleGaugeSizeChange(size);
    handleColoredBorderSizeChange(size);
  }, [size, value]);

  const gaugeSizeCss = `${classes.gauge}`;
  const centerCoverCss = `${classes['center-hide']} ${classes[centerCoverSize]}`;
  const coloredBorderCss = `${classes['colored-border']}`;

  return (
    <>
      <div className={classes.container}>
        <div className='center-content'>
          <p>0</p>
        </div>
        <div className={centerCoverCss}></div>
        <div className={`${coloredBorderCss} index-0`}>
          <div className='arrow'></div>
        </div>
        <div className={gaugeSizeCss}>
          <div className={`${classes.piece} ${classes['piece--0']}`}></div>
          <div className={`${classes.piece} ${classes['piece--1']}`}></div>
          <div className={`${classes.piece} ${classes['piece--2']}`}></div>
          <div className={`${classes.piece} ${classes['piece--3']}`}></div>
          <div className={`${classes.piece} ${classes['piece--4']}`}></div>
          <div className={`${classes.piece} ${classes['piece--5']}`}></div>
          <div className={`${classes.piece} ${classes['piece--6']}`}></div>
          <div className={`${classes.piece} ${classes['piece--7']}`}></div>
          <div className={`${classes.piece} ${classes['piece--8']}`}></div>
          <div className={`${classes.piece} ${classes['piece--9']}`}></div>
          <div className={`${classes.piece} ${classes['piece--10']}`}></div>
        </div>
      </div>
    </>
  );
}

/////////////////////////////////////////////
// This are helper functions and probably will not stay in the component. You may want to bring them from outside, therefore I don't use useCallback for them.

function handleColoredBorderSizeChange(size) {
  const formattedSize = formatSize(size);
  if (!formattedSize) {
    return null;
  }

  const coloredBorderWidth =
    formattedSize === 'small' ? 7 : formattedSize === 'medium' ? 11 : 15;
  const coloredBorderHeight =
    formattedSize === 'small' ? 7 : formattedSize === 'medium' ? 11 : 15;
  const coloredBorderTop =
    formattedSize === 'small' ? 11.5 : formattedSize === 'medium' ? 9.5 : 7.5;
  const coloredBorderLeft =
    formattedSize === 'small' ? 11.5 : formattedSize === 'medium' ? 9.5 : 7.5;
  const coloredBorderBorder =
    formattedSize === 'small' ? 0.3 : formattedSize === 'medium' ? 0.4 : 0.5;

  dynamicUpdateStyleProperty([
    { name: '--dynamic-colored-border-width', value: coloredBorderWidth },
    { name: '--dynamic-colored-border-height', value: coloredBorderHeight },
    { name: '--dynamic-colored-border-top', value: coloredBorderTop },
    { name: '--dynamic-colored-border-left', value: coloredBorderLeft },
    { name: '--dynamic-colored-border-border', value: coloredBorderBorder },
  ]);
}

function handleGaugeSizeChange(size) {
  const formattedSize = formatSize(size);
  if (!formattedSize) {
    return null;
  }

  const gaugeWidth =
    formattedSize === 'small' ? 10 : formattedSize === 'medium' ? 15 : 20;
  const gaugeHeight =
    formattedSize === 'small' ? 10 : formattedSize === 'medium' ? 15 : 20;
  const gaugeTop =
    formattedSize === 'small' ? 10 : formattedSize === 'medium' ? 7.5 : 5;
  const gaugeLeft =
    formattedSize === 'small' ? 10 : formattedSize === 'medium' ? 7.5 : 5;

  dynamicUpdateStyleProperty([
    { name: '--dynamic-gauge-width', value: gaugeWidth },
    { name: '--dynamic-gauge-height', value: gaugeHeight },
    { name: '--dynamic-gauge-top', value: gaugeTop },
    { name: '--dynamic-gauge-left', value: gaugeLeft },
  ]);
}

function formatSize(size) {
  const formattedSize = size?.toLowerCase().trim();
  if (!['small', 'medium', 'large'].includes(formattedSize)) {
    return null;
  }
  return formattedSize;
}

function dynamicUpdateStyleProperty(cssPropsDataArray) {
  cssPropsDataArray?.forEach((cssProp) => {
    document.documentElement.style.setProperty(
      `${cssProp?.name}`,
      `${cssProp?.value}rem`
    );
  });
}
