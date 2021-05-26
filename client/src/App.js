import 'bulma/css/bulma.min.css';
import React, { useState, useEffect } from 'react';
import { Button, Heading } from 'react-bulma-components';
import Scanner from './components/scanner'
import './App.css';

function App() {
  const [scanner, setScanner] = useState({scanning: false, barcode: null});

  useEffect(() => {
    console.log(scanner)
  }, [scanner])

  const toggleScanner = () => {
    setScanner({
      scanning: !scanner.scanning,
      barcode: scanner.barcode
    })
  }
  
  return (
    <div>
      <br/>
      <Heading>Vegan Checker</Heading>
      <Button onClick={toggleScanner}>turn {scanner.scanning? "off" : "on"} camera</Button>
      {scanner.scanning? <Scanner scanner={scanner} setScanner={setScanner}/> : null}
    </div>
  );
}

export default App;
