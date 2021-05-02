import './App.css';
import React, { useState } from 'react';
import Scanner from './components/scanner'

function App() {
  const [scanning, setScanning] = useState(false);

  return (
    <div>
      <h1>Vegan Checker</h1>
      <button onClick={() => {setScanning(!scanning)}}>turn {scanning? "off" : "on"} camera</button>
      {scanning? <Scanner setScanning={setScanning}/> : null}
    </div>
  );
}

export default App;
