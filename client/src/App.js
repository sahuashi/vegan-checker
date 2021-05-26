import 'bulma/css/bulma.min.css';
import React, { useState } from 'react';
import { Button, Container, Heading } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarcode, faCamera, faSeedling } from '@fortawesome/free-solid-svg-icons'
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
    <Container>
      <Heading pt="5" weight="light"><FontAwesomeIcon icon={faSeedling} color="DarkSeaGreen"/> Vegan Checker</Heading>
      <Button onClick={toggleScanner}>{scanner.scanning? "Stop" : "Start"} scanning <FontAwesomeIcon icon={faCamera} color="olivedrab" style={{marginLeft: '0.5em'}}/></Button>
      {scanner.scanning? <Scanner scanner={scanner} setScanner={setScanner}/> : null}
      {scanner.barcode? <Product barcode={scanner.barcode}/> : null}
    </Container>
  );
}

export default App;
