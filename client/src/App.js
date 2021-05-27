import 'bulma/css/bulma.min.css';
import React, { useState } from 'react';
import { Button, Container, Heading } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faSeedling } from '@fortawesome/free-solid-svg-icons'
import Scanner from './components/scanner'
import Product from './components/product'
import About from './components/img/chores-watering-plants.svg'
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
    <Container id="body">
      <Heading pt="5" weight="light" className="blue"><FontAwesomeIcon icon={faSeedling} color="DarkSeaGreen"/> Vegan Checker</Heading>
      <Button mb="4" rounded onClick={toggleScanner} className="blue">{scanner.scanning? "Stop scanning" : "Scan"} 
      <FontAwesomeIcon icon={faCamera} color="DarkSeaGreen" id="icon" /></Button>
      {scanner.scanning && <Scanner scanner={scanner} setScanner={setScanner}/>}
      {scanner.barcode && <Product barcode={scanner.barcode}/>}
      {!scanner.scanning && !scanner.barcode && <div id="home">
      <Heading className="blue" mt="5" mb="0" size="5" weight="light">Check if a product is vegan by clicking the scan button and scanning the product's barcode.</Heading>
      <img src={About} alt="background" id="vector"/></div>}
    </Container>
  );
}

export default App;
