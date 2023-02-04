import React from 'react';
import Add from './component/Add';
import './styles/App.css';
import View from './component/View';

function App() {
  return (
    <div className="App">
      <h1
        style={{ textAlign: 'center' }}
        className="text-white"
      >
        Notes-App
      </h1>
      <div className="text-center text-light">
        Created by
        {' '}
        <a href="https://github.com/argf013" target="_blank" rel="noreferrer">Arfa</a>
        {' '}
      </div>
      <Add />
      <View />
    </div>

  );
}

export default App;
