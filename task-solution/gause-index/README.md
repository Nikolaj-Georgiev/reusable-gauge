# Gauge Component Documentation

The `Gauge` component is a customizable gauge visualization that displays a value within a circular container. It's suitable for visualizing progress, metrics, or any other data that can be represented as a percentage.

## Props

1. **`value` (number)**:
   - The value to display on the gauge (ranging from 0 to 10).
   - Example: `value={7}`

2. **`size` (string)**:
   - The size of the gauge (small, medium, or large).
   - Example: `size="medium"`

## Usage

```jsx
import Gauge from './Gauge';

function App() {
  return (
    <div>
      <Gauge value={5} size="medium" />
    </div>
  );
}

