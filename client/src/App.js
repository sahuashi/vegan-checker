import 'bulma/css/bulma.min.css';
import React, { useState, useEffect } from 'react';
import { Button, Heading } from 'react-bulma-components';
import axios from 'axios';
import Scanner from './components/scanner'
import Product from './components/product'
import './App.css';

function App() {
  const [scanner, setScanner] = useState({scanning: false, barcode: null});

  useEffect(() => {
    if (scanner.barcode) {
      axios.post("http://localhost:5000/", scanner.barcode)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    }
  }, [scanner]);

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
      {scanner.barcode? <Product /> : null}
    </div>
  );
}

export default App;
