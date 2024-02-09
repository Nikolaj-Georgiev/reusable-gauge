// import ComponentName from './components/ComponentName';
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
    setGaugeIndex(Number(index));
  };

  return (
    <>
      <div className='container'>
        <Gauge
          size={sizeValue}
          value={gaugeIndex}
        />
        <form onSubmit={handleSubmit}>
          <div className='size'>
            <input
              type='text'
              name='size'
              id='size'
            />
            <button>size</button>
          </div>
          <div className='index'>
            <input
              type='number'
              id='index'
              name='index'
            />
            <button>index</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
