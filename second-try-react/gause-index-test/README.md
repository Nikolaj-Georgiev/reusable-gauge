Gauge Component Documentation
Overview
The Gauge component is a customizable gauge visualization that displays a value within a circular container. It’s suitable for visualizing progress, metrics, or any other data that can be represented as a percentage.

Props
The Gauge component accepts the following props:

value (number):
The value to display on the gauge (ranging from 0 to 10).
Example: value={7}
size (string):
The size of the gauge (small, medium, or large).
Example: size="medium"
Usage
import Gauge from './Gauge';

function App() {
return (

<div>
<Gauge value={5} size="medium" />
</div>
);
}

Styling
The Gauge component uses CSS modules for styling. You can customize the appearance by modifying the relevant CSS classes in your stylesheet.

Examples
Display a small gauge with a value of 3:
<Gauge value={3} size="small" />

Show a large gauge with a value of 8:
<Gauge value={8} size="large" />
