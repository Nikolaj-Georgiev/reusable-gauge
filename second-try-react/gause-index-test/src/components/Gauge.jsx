/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';

import classes from './Gauge.module.css';

export default function Gauge({ value, size }) {
  const [gaugeSize, setGaugeSize] = useState('');
  const [centerCoverSize, setCenterCoverSize] = useState('');
  const gaugeSizeCss = `${classes.gauge} ${classes[gaugeSize]}`;
  const centerCoverCss = `${classes['center-hide']} ${classes[centerCoverSize]}`;

  useEffect(() => {
    if (size === 'small' || size === 'medium' || size === 'large') {
      setGaugeSize(size);
      setCenterCoverSize(size);
    }
  }, [size]);

  return (
    <>
      <div className={classes.container}>
        <div className='center-content'>
          <p>0</p>
        </div>
        <div className={centerCoverCss}></div>
        <div className='arrow-wrapper index-0'>
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
