// import ComponentName from './components/ComponentName';
// import Gauge from './components/Gauge';
import { useState } from 'react';
import GaugeRevised from './components/GaugeRevised';

function App() {
  const [sizeValue, setSizeValue] = useState('large');
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
      <div className='hero-container'>
        <div className='row-1'>
          {Array.from({ length: 6 }).map((_, i) => (
            <img
              key={i}
              src={`../${i}-index.jpg`}
              alt={`${i}-index`}
            />
          ))}
        </div>
        <div className='row-2'>
          {Array.from({ length: 5 }).map((_, i) => (
            <img
              key={i + 6}
              src={`../${i + 6}-index.jpg`}
              alt={`${i + 6}-index`}
            />
          ))}
        </div>
      </div>
      <div className='container'>
        <GaugeRevised
          size={sizeValue}
          value={gaugeIndex}
        />
        <form onSubmit={handleSubmit}>
          <div className='input-container'>
            <div className='size'>
              <label htmlFor='size'>Size</label>
              <select
                id='size'
                name='size'
              >
                <option value='large'>large</option>
                <option value='medium'>medium</option>
                <option value='small'>small</option>
              </select>
            </div>
            <div className='index'>
              <label htmlFor='index'>Index value</label>
              <input
                type='number'
                id='index'
                name='index'
              />
            </div>
          </div>
          <button>submit</button>
        </form>
      </div>
    </>
  );
}

export default App;
