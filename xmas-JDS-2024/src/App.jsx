import React from 'react';
import './App.css';
import StarrySky from './StarrySky';

const App = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div className='top-tile'></div>
      <div className='bottom-tile'></div>
      <div className='left-tile'></div>
      <div className='right-tile'></div>
      <div className="fog-overlay"></div>

      <StarrySky />
    </div>
  );
};

export default App;
