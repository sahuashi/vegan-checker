import React, { Component } from 'react';

import { faBarcode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {
  Box, Block, Heading, Tag,
} from 'react-bulma-components';
import ReactLoading from 'react-loading';

import Search from '../assets/nature-plant.svg';

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      isVegan: '',
      image: '',
      loading: true,
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/lookup/', {
      params: {
        upc: this.props.barcode,
      },
    })
      .then((res) => {
        if (res.data !== 'Product not found.') {
          this.setState({
            name: res.data.name,
            isVegan: res.data.isVegan,
            image: res.data.image,
            loading: false,
          });
        } else {
          this.setState({
            name: 'not found',
            loading: false,
          });
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    const veganResult = this.state.isVegan
      ? <Tag rounded color="success" colorVariant="light" size="medium">Vegan</Tag>
      : <Tag rounded color="danger" colorVariant="light" size="medium">Not Vegan</Tag>;
    const imageResult = this.state.image
      ? <img src={this.state.image} alt="Product" id="product" />
      : <img src={Search} alt="404 thumbnail" id="search" />;
    const searchResult = this.state.name !== 'not found'
      ? (
        <div>
          <Heading subtitle weight="light" size="5" mb="3" className="blue">{this.state.name}</Heading>
          {imageResult}
          <Block py="1">{veganResult}</Block>
        </div>
      )
      : (
        <div>
          <img src={Search} alt="404 Search" id="search" />
          <Block textWeight="light" mt="0" className="blue">
            This product was not found in the food database.
            <br />
            Please try again or scan a different product.
          </Block>
        </div>
      );
    return (
      <Box id="result">
        <Heading subtitle weight="light" size="6" mb="3" className="blue">
          <FontAwesomeIcon icon={faBarcode} size="lg" color="darkolivegreen" />
          {' '}
          UPC:
          {' '}
          {this.props.barcode}
        </Heading>
        {this.state.loading ? <ReactLoading type="bubbles" color="darkseagreen" height="auto" width="auto" /> : <div>{searchResult}</div>}
      </Box>
    );
  }
}
