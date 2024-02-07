import Gauge from './components/Gauge';
import { useState } from 'react';

function App() {
  const [sizeValue, setSizeValue] = useState('');
  const [gaugeIndex, setGaugeIndex] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const size = formData.get('size');
    const index = formData.get('index');
    setSizeValue(size);
    setGaugeIndex(index);
  };

  return (
    <>
      <Gauge
        size={sizeValue}
        value={gaugeIndex}
      />
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='size'
          id='size'
        />
        <input
          type='number'
          id='index'
          name='index'
        />
        <button>submit</button>
      </form>
    </>
  );
}

export default App;
