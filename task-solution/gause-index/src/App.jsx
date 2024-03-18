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
          <img
            src='../0-index.jpg'
            alt='0-index'
          />
          <img
            src='../1-index.jpg'
            alt='1-index'
          />
          <img
            src='../2-index.jpg'
            alt='2-index'
          />
          <img
            src='../3-index.jpg'
            alt='3-index'
          />
          <img
            src='../4-index.jpg'
            alt='4-index'
          />
          <img
            src='../5-index.jpg'
            alt='5-index'
          />
        </div>
        <div className='row-2'>
          <img
            src='../6-index.jpg'
            alt='6-index'
          />
          <img
            src='../7-index.jpg'
            alt='7-index'
          />
          <img
            src='../8-index.jpg'
            alt='8-index'
          />
          <img
            src='../9-index.jpg'
            alt='9-index'
          />
          <img
            src='../10-index.jpg'
            alt='10-index'
          />
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
