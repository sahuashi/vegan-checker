import './App.css';
import React, { useState } from 'react';
import Scanner from './components/scanner'

function App() {
  const [scanner, setScanner] = useState({scanning: false, result: 0});

  const toggleScanner = () => {
    setScanner({
      scanning: !scanner.scanning,
      result: scanner.result
    })
  }
  
  return (
    <div>
      <h1>Vegan Checker</h1>
      <button onClick={toggleScanner}>turn {scanner.scanning? "off" : "on"} camera</button>
      {scanner.scanning? <Scanner scanner={scanner} setScanner={setScanner}/> : null}
    </div>
  );
}

export default App;
