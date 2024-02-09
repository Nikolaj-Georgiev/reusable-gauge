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
          <div className='input-container'>
            <div className='size'>
              <label htmlFor='size'>Size</label>

              <input
                type='text'
                name='size'
                id='size'
              />
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
