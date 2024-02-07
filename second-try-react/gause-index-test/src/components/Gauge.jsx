/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';

import classes from './Gauge.module.css';

export default function Gauge({ value, size }) {
  const [gaugeSize, setGaugeSize] = useState('');
  const [centerCoverSize, setCenterCoverSize] = useState('');
  const [indexValue, setIndexValue] = useState(0);
  const [coloredBorderSize, setColoredBorderSize] = useState({
    width: 7,
    height: 7,
    top: 11.5,
    left: 11.5,
  });

  useEffect(() => {
    const formattedSize = size?.toLowerCase().trim();
    if (['small', 'medium', 'large'].includes(formattedSize)) {
      setGaugeSize(formattedSize);
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
    handleSizeChange(size);
  }, [size, value]);

  const gaugeSizeCss = `${classes.gauge} ${classes[gaugeSize]}`;
  const centerCoverCss = `${classes['center-hide']} ${classes[centerCoverSize]}`;
  const coloredBorderCss = `${classes['colored-border']}`;

  function handleSizeChange(size) {
    const formattedSize = size?.toLowerCase().trim();
    if (!['small', 'medium', 'large'].includes(formattedSize)) {
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

    setColoredBorderSize((prevSize) => ({
      ...prevSize,
      width: coloredBorderWidth,
      height: coloredBorderHeight,
      top: coloredBorderTop,
      left: coloredBorderLeft,
    }));

    document.documentElement.style.setProperty(
      '--dynamic-colored-border-width',
      `${coloredBorderWidth}rem`
    );
    document.documentElement.style.setProperty(
      '--dynamic-colored-border-height',
      `${coloredBorderHeight}rem`
    );
    document.documentElement.style.setProperty(
      '--dynamic-colored-border-top',
      `${coloredBorderTop}rem`
    );
    document.documentElement.style.setProperty(
      '--dynamic-colored-border-left',
      `${coloredBorderLeft}rem`
    );
  }

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
          <div className={`${classes.piece} ${classes['piece--00']}`}></div>
          <div className={`${classes.piece} ${classes['piece--01']}`}></div>
          <div className={`${classes.piece} ${classes['piece--02']}`}></div>
          <div className={`${classes.piece} ${classes['piece--03']}`}></div>
          <div className={`${classes.piece} ${classes['piece--04']}`}></div>
          <div className={`${classes.piece} ${classes['piece--05']}`}></div>
          <div className={`${classes.piece} ${classes['piece--06']}`}></div>
          <div className={`${classes.piece} ${classes['piece--07']}`}></div>
          <div className={`${classes.piece} ${classes['piece--08']}`}></div>
          <div className={`${classes.piece} ${classes['piece--09']}`}></div>
          <div className={`${classes.piece} ${classes['piece--010']}`}></div>
        </div>
      </div>
    </>
  );
}
