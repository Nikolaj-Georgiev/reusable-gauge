/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useState, useEffect } from 'react';

import classes from './GaugeRevised.module.css';

export default function GaugeRevised({ value, size }) {
  const [indexValue, setIndexValue] = useState(0);

  useEffect(() => {
    const checkedValue = validateIndex(value);
    if (checkedValue || checkedValue === 0) {
      setIndexValue(checkedValue);
    }
    updateStyles(indexValue, size);
  }, [size, value, indexValue]);

  // you may want to add classes here, therefore they are initiated with with let and in separate variables.
  let gaugeSizeCss = `${classes.gauge}`;
  let centerCoverCss = `${classes['center-cover']}`;
  let coloredBorderCss = `${classes['colored-border']}`;
  let centerContentCss = `${classes['center-content']}`;

  return (
    <>
      <div className={classes.container}>
        <div className={centerContentCss}>
          <p>{indexValue}</p>
        </div>
        <div className={centerCoverCss}></div>
        <div className={`${coloredBorderCss} index-0`}>
          <div className={classes.arrow}></div>
        </div>
        <div className={gaugeSizeCss}>
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

/////////////////////////////////////////////
// This are helper functions and probably will not stay in the component. You may want to bring them from outside, therefore I don't use useCallback for them.

function updateStyles(index, size) {
  handleArrowPosition(index);
  handlePositionColors(index);

  handleGaugeSizeChange(size);
  handleColoredBorderSizeChange(size);
  handleCenterCoverSizeChange(size);
  handleCenterContentSizeChange(size);
  handleArrowSizeChange(size);
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

function handleArrowPosition(index) {
  dynamicUpdatePositionProperty(index);
}

function handlePositionColors(index) {
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

// this function can be omitted if you receive are sure that you are going to receive 'small', 'medium' or 'large'.
function formatSize(size) {
  const formattedSize = size?.toLowerCase().trim();
  if (!['small', 'medium', 'large'].includes(formattedSize)) {
    return null;
  }
  return formattedSize;
}

function dynamicUpdateSizeStyleProperty(cssPropsDataArray) {
  cssPropsDataArray?.forEach((cssProp) => {
    document.documentElement.style.setProperty(
      `${cssProp?.name}`,
      `${
        !cssProp.name.includes('translate')
          ? `${cssProp?.value}rem`
          : `${cssProp?.value}%`
      }`
    );
  });
}

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

function handleCenterContentSizeChange(size) {
  const formattedSize = formatSize(size);
  if (!formattedSize) {
    return null;
  }

  const centerContentWidth =
    formattedSize === 'small' ? 4 : formattedSize === 'medium' ? 6 : 8;
  const centerContentHeight =
    formattedSize === 'small' ? 4 : formattedSize === 'medium' ? 6 : 8;
  const centerContentTop =
    formattedSize === 'small' ? 13 : formattedSize === 'medium' ? 12 : 11;
  const centerContentLeft =
    formattedSize === 'small' ? 13 : formattedSize === 'medium' ? 12 : 11;
  const centerContentFontSize =
    formattedSize === 'small' ? 3.2 : formattedSize === 'medium' ? 5 : 7;

  dynamicUpdateSizeStyleProperty([
    { name: '--center-content-width', value: centerContentWidth },
    { name: '--center-content-height', value: centerContentHeight },
    { name: '--center-content-top', value: centerContentTop },
    { name: '--center-content-left', value: centerContentLeft },
    {
      name: '--center-content-font-size',
      value: centerContentFontSize,
    },
  ]);
}

function handleArrowSizeChange(size) {
  const formattedSize = formatSize(size);
  if (!formattedSize) {
    return null;
  }

  const arrowTranslate =
    formattedSize === 'small' ? 15 : formattedSize === 'medium' ? 10 : 10;
  const arrowLeftBorder =
    formattedSize === 'small' ? 0.4 : formattedSize === 'medium' ? 0.7 : 1;
  const arrowRightBorder =
    formattedSize === 'small' ? 0.4 : formattedSize === 'medium' ? 0.7 : 1;
  const arrowBottomBorder =
    formattedSize === 'small' ? 0.8 : formattedSize === 'medium' ? 1.3 : 1.8;

  dynamicUpdateSizeStyleProperty([
    { name: '--arrow-left-border', value: arrowLeftBorder },
    { name: '--arrow-right-border', value: arrowRightBorder },
    { name: '--arrow-bottom-border', value: arrowBottomBorder },
    { name: '--arrow-translate', value: arrowTranslate },
  ]);
}

function handleColoredBorderSizeChange(size) {
  const formattedSize = formatSize(size);
  if (!formattedSize) {
    return null;
  }

  const coloredBorderWidth =
    formattedSize === 'small' ? 6.5 : formattedSize === 'medium' ? 10 : 13;
  const coloredBorderHeight =
    formattedSize === 'small' ? 6.5 : formattedSize === 'medium' ? 10 : 13;
  const coloredBorderTop =
    formattedSize === 'small' ? 11.8 : formattedSize === 'medium' ? 10 : 8.5;
  const coloredBorderLeft =
    formattedSize === 'small' ? 11.8 : formattedSize === 'medium' ? 10 : 8.5;
  const coloredBorderBorder =
    formattedSize === 'small' ? 0.32 : formattedSize === 'medium' ? 0.46 : 0.64;

  dynamicUpdateSizeStyleProperty([
    { name: '--colored-border-width', value: coloredBorderWidth },
    { name: '--colored-border-height', value: coloredBorderHeight },
    { name: '--colored-border-top', value: coloredBorderTop },
    { name: '--colored-border-left', value: coloredBorderLeft },
    { name: '--colored-border-border', value: coloredBorderBorder },
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

  dynamicUpdateSizeStyleProperty([
    { name: '--gauge-width', value: gaugeWidth },
    { name: '--gauge-height', value: gaugeHeight },
    { name: '--gauge-top', value: gaugeTop },
    { name: '--gauge-left', value: gaugeLeft },
  ]);
}

function handleCenterCoverSizeChange(size) {
  const formattedSize = formatSize(size);
  if (!formattedSize) {
    return null;
  }

  const centerCoverWidth =
    formattedSize === 'small' ? 9 : formattedSize === 'medium' ? 13.6 : 18;
  const centerCoverHeight =
    formattedSize === 'small' ? 9 : formattedSize === 'medium' ? 13.6 : 18;
  const centerCoverTop =
    formattedSize === 'small' ? 10.5 : formattedSize === 'medium' ? 8.2 : 6;
  const centerCoverLeft =
    formattedSize === 'small' ? 10.5 : formattedSize === 'medium' ? 8.2 : 6;

  dynamicUpdateSizeStyleProperty([
    { name: '--center-cover-width', value: centerCoverWidth },
    { name: '--center-cover-height', value: centerCoverHeight },
    { name: '--center-cover-top', value: centerCoverTop },
    { name: '--center-cover-left', value: centerCoverLeft },
  ]);
}
