import 'bulma/css/bulma.min.css';
import React, { useState } from 'react';
import { Button, Heading } from 'react-bulma-components';
import Scanner from './components/scanner'
import Product from './components/product'
import './App.css';

function App() {
  const [scanner, setScanner] = useState({scanning: false, barcode: null});

  const toggleScanner = () => {
    const barcode = scanner.scanning? scanner.barcode : null;
    setScanner({
      scanning: !scanner.scanning,
      barcode: barcode
    })
  }
  
  return (
    <div>
      <br/>
      <Heading>Vegan Checker</Heading>
      <Button onClick={toggleScanner}>turn {scanner.scanning? "off" : "on"} camera</Button>
      {scanner.scanning? <Scanner scanner={scanner} setScanner={setScanner}/> : null}
      {scanner.barcode? <Product barcode={scanner.barcode}/> : null}
    </div>
  );
}

export default App;
