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
        <a href="https://github.com/argf013" target="_blank" rel="noreferrer">Argf</a>
        {' '}
      </div>
      <Add />
      <h3 className="text-light mt-5 text-center">Your Notes:</h3>
      <View />
    </div>

  );
}

export default App;
