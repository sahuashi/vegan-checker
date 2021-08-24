import React, { useState } from 'react';

import { faCamera, faSeedling } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Heading } from 'react-bulma-components';

import PlantsVector from './assets/chores-watering-plants.svg';
import Product from './components/Product';
import Scanner from './components/Scanner';
import 'bulma/css/bulma.min.css';
import './App.css';

function App() {
  const [scanner, setScanner] = useState({ scanning: false, barcode: null });

  const toggleScanner = () => {
    const barcode = scanner.scanning ? scanner.barcode : null;
    setScanner({
      scanning: !scanner.scanning,
      barcode,
    });
  };

  return (
    <Container id="body">
      <Heading pt="5" weight="light" className="blue">
        <FontAwesomeIcon icon={faSeedling} color="DarkSeaGreen" />
        {' '}
        Vegan Checker
      </Heading>
      <Button mb="4" rounded onClick={toggleScanner} className="blue">
        {scanner.scanning ? 'Stop scanning' : 'Scan'}
        <FontAwesomeIcon icon={faCamera} color="DarkSeaGreen" id="icon" />
      </Button>
      {scanner.scanning && <Scanner scanner={scanner} setScanner={setScanner} />}
      {scanner.barcode && <Product barcode={scanner.barcode} />}
      {!scanner.scanning && !scanner.barcode && (
      <div id="home">
        <Heading className="blue" mt="5" mb="0" size="5" weight="light">Check if a product is vegan by clicking the scan button and scanning the product&apos;s barcode.</Heading>
        <img src={PlantsVector} alt="background" id="vector" />
      </div>
      )}
    </Container>
  );
}

export default App;
