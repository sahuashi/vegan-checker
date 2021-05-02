import './App.css';
import React, { useState } from 'react';
import Scanner from './components/scanner'

function App() {
  const [scanner, setScanner] = useState({scanning: false, result: ''});

  
  return (
    <div>
      <h1>Vegan Checker</h1>
      <button onClick={() => {setScanner({scanning: !scanner.scanning})}}>turn {scanner.scanning? "off" : "on"} camera</button>
      {scanner.scanning? <Scanner scanner={scanner} setScanner={setScanner}/> : null}
    </div>
  );
}

export default App;
