import React, { useEffect } from 'react';
import styles from './ComponentName.module.css';

function ComponentName() {
  const [size, setSize] = React.useState({
    width: 100,
    height: 100,
    top: 0,
    left: 0,
  });

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--dynamic-width',
      `${size.width}px`
    );
    document.documentElement.style.setProperty(
      '--dynamic-height',
      `${size.height}px`
    );
    document.documentElement.style.setProperty(
      '--dynamic-top',
      `${size.top}px`
    );
    document.documentElement.style.setProperty(
      '--dynamic-left',
      `${size.left}px`
    );
  }, [size]);

  const increaseSize = () => {
    setSize((prevSize) => ({
      ...prevSize,
      width: prevSize.width + 10,
      height: prevSize.height + 10,
      top: prevSize.top + 5,
      left: prevSize.left + 5,
    }));
  };

  return (
    <div>
      <div className={styles.myComponent}>Hello</div>
      <button onClick={increaseSize}>Increase Size</button>
    </div>
  );
}

export default ComponentName;
